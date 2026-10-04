import {
  access,
  cp,
  mkdir,
  mkdtemp,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { exportLearning } from "./export-learning";

async function main() {
  const root = process.cwd();
  const artifacts = path.join(root, "artifacts");
  await mkdir(artifacts, { recursive: true });
  const staging = await mkdtemp(path.join(artifacts, "pages-build-"));
  // Copy only build inputs. Never copy local credentials, sessions, or server routes.
  for (const name of [
    "src",
    "public",
    "next.config.ts",
    "tsconfig.json",
    "next-env.d.ts",
    "package.json",
    "package-lock.json",
  ]) {
    if (name === "public") {
      try {
        await access(path.join(root, name));
      } catch {
        continue;
      }
    }
    await cp(path.join(root, name), path.join(staging, name), {
      recursive: true,
      filter: (source) => {
        const relative = path.relative(root, source).replaceAll("\\", "/");
        return relative !== "src/app/api" && relative !== "src/proxy.ts";
      },
    });
  }
  const basePath = process.env.PAGES_BASE_PATH ?? "/master-learn";
  if (basePath && !/^\/[a-zA-Z0-9._-]+$/.test(basePath))
    throw new Error("PAGES_BASE_PATH must be empty or /repository-name.");
  const publicDir = path.join(staging, "public");
  await mkdir(publicDir, { recursive: true });
  await exportLearning(publicDir);
  await writeFile(path.join(publicDir, ".nojekyll"), "");
  // Environment files are intentionally absent. Only the public client ID enters the export.
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NODE_ENV: "production",
    NEXT_PUBLIC_GITHUB_PAGES: "true",
    NEXT_PUBLIC_BASE_PATH: basePath,
  };
  for (const key of [
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_SESSION_KEY",
    "GOOGLE_SESSION_DIR",
    "APP_ACCESS_PASSWORD",
    "GOOGLE_CLIENT_ID",
  ])
    delete env[key];
  const result = await new Promise<number>((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        path.join(root, "node_modules/next/dist/bin/next"),
        "build",
        "--webpack",
      ],
      { cwd: staging, env, stdio: "inherit" },
    );
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });
  if (result) throw new Error(`Static build failed (${result}).`);
  const out = path.resolve(root, "out");
  if (path.dirname(out) !== root || !staging.startsWith(artifacts + path.sep))
    throw new Error("Unsafe build output path.");
  await rm(out, { recursive: true, force: true });
  await rename(path.join(staging, "out"), out);
  await rm(staging, { recursive: true, force: true });
  console.log(`GitHub Pages output: ${out} (base path ${basePath || "/"}).`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
