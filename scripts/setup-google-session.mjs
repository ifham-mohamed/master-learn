import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
const file = new URL("../.env.local", import.meta.url);
let source = await readFile(file, "utf8").catch((error) => {
  if (error.code === "ENOENT") return "";
  throw error;
});
if (!/^GOOGLE_SESSION_KEY=.+$/m.test(source)) {
  source = source.replace(/^GOOGLE_SESSION_KEY=.*\r?\n?/m, "");
  source += `\nGOOGLE_SESSION_KEY=${randomBytes(32).toString("hex")}\n`;
}
if (!/^APP_ORIGIN=/m.test(source))
  source += "APP_ORIGIN=http://localhost:3100\n";
if (!/^GOOGLE_CLIENT_SECRET=/m.test(source))
  source += "GOOGLE_CLIENT_SECRET=\n";
await writeFile(file, source, { mode: 0o600 });
console.log(
  "Local session key prepared without displaying it. Add your Google client secret in .env.local and register the callback URI shown in the app.",
);
