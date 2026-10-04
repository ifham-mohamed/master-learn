export const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export function assetUrl(path: string) {
  return `${basePath}${path}`;
}
export function staticFileKey(path: string) {
  return Array.from(new TextEncoder().encode(path), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
export function staticFilePath(id: string, path: string, raw = false) {
  const ext = path.split(".").pop()?.toLowerCase() || "";
  const suffix = raw
    ? ["png", "jpg", "jpeg", "gif", "webp", "avif", "pdf"].includes(ext)
      ? `.${ext}`
      : ".txt"
    : ".json";
  return `/learning-data/${encodeURIComponent(id)}/${raw ? "files" : "documents"}/${staticFileKey(path)}${suffix}`;
}
