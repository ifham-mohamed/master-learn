export const contentSections = [
  "theory",
  "notes",
  "code",
  "results",
  "resources",
] as const;
export type ContentSection = (typeof contentSections)[number];
export type ContentKind =
  "markdown" | "code" | "html" | "image" | "pdf" | "text";
export type LearningFile = {
  path: string;
  name: string;
  section: ContentSection;
  kind: ContentKind;
  bytes: number;
  modified: string;
  revision: string;
};
export type LearningManifest = {
  taskId: string;
  folder: string;
  files: LearningFile[];
  revision: string;
  warnings: string[];
};
export type LearningDocument = { file: LearningFile; content: string };
export function learningFileUrl(id: string, path: string, raw = false) {
  return `/api/learning/${encodeURIComponent(id)}?path=${encodeURIComponent(path)}${raw ? "&raw=1" : ""}`;
}

/** Resolve relative document links against the selected file, confined to its task. */
export function resolveLearningLink(
  current: string,
  href: string,
): string | null {
  if (
    !href ||
    /^[a-z][a-z\d+.-]*:/i.test(href) ||
    href.startsWith("/") ||
    href.includes("\\")
  )
    return null;
  const parts = current.split("/").slice(0, -1);
  let decoded: string;
  try {
    decoded = decodeURIComponent(href.split(/[?#]/)[0]);
  } catch {
    return null;
  }
  for (const part of decoded.split("/")) {
    if (part === "..") {
      if (!parts.length) return null;
      parts.pop();
    } else if (part && part !== ".") parts.push(part);
  }
  return parts.join("/");
}
