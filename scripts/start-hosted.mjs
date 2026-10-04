import { spawn } from "node:child_process";

const origin = new URL(process.env.APP_ORIGIN || "http://invalid.local");
if (origin.protocol !== "https:" || origin.origin !== process.env.APP_ORIGIN)
  throw new Error(
    "Hosted startup requires APP_ORIGIN with your exact HTTPS origin (no trailing slash).",
  );
if ((process.env.APP_ACCESS_PASSWORD || "").length < 20)
  throw new Error(
    "Hosted startup requires APP_ACCESS_PASSWORD with at least 20 characters.",
  );
if (!process.env.GOOGLE_SESSION_DIR)
  throw new Error(
    "Set GOOGLE_SESSION_DIR to a directory on your persistent disk.",
  );
const port = process.env.PORT || "3000";
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535)
  throw new Error("Invalid PORT.");
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "0.0.0.0",
    "--port",
    port,
  ],
  { stdio: "inherit" },
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => server.kill(signal));
server.on("exit", (code) => process.exit(code ?? 1));
server.on("error", () => process.exit(1));
