"use client";

import { isValidElement, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { isGitHubPages } from "@/lib/deployment";
import {
  BookOpen,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  ImageIcon,
  Link2,
  NotebookPen,
  RefreshCw,
  TestTube2,
} from "lucide-react";
import {
  contentSections,
  learningLogPath,
  taskGuidePath,
  learningFileUrl,
  learningManifestUrl,
  resolveLearningLink,
  resolveGuideReference,
  type ContentSection,
  type LearningManifest,
  type LearningDocument,
  type LearningFile,
} from "@/lib/learning-types";

const labels: Record<ContentSection, string> = {
  theory: "Theory",
  notes: "Guide & log",
  code: "Code",
  results: "Results",
  resources: "Resources",
};
const icons = {
  theory: BookOpen,
  notes: NotebookPen,
  code: Code2,
  results: TestTube2,
  resources: Link2,
};
function displayFileName(file: LearningFile) {
  if (file.path === learningLogPath) return "Learning log";
  if (file.path === taskGuidePath) return "Task guide";
  return file.path.split("/").slice(1).join("/");
}
async function readJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { cache: isGitHubPages ? "default" : "no-store", signal });
  const data = await response.json();
  if (!response.ok || data.error)
    throw new Error(data.error || "Could not load the learning content.");
  return data;
}

export function LearningWorkspace({ taskId, initialFile }: { taskId: string; initialFile?: string }) {
  const [manifest, setManifest] = useState<LearningManifest | null>(null);
  const [section, setSection] = useState<ContentSection>(initialFile ? "notes" : "theory");
  const [selectedPath, setSelectedPath] = useState(initialFile ?? "");
  const lastRequested = useRef<string | null | undefined>(undefined);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [copied, setCopied] = useState(false);
  const refresh = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const data = await readJson<LearningManifest>(
          learningManifestUrl(taskId),
          signal,
        );
        setManifest((previous) =>
          previous?.revision === data.revision ? previous : data,
        );
        setError("");
        const requested = new URLSearchParams(window.location.search).get("file");
        if (requested !== lastRequested.current) {
          const match = data.files.find((file) => file.path === requested) ??
            (requested === "notes/00-warehouse-practice.md" ? data.files.find((file) => file.path === taskGuidePath) : undefined);
          if (match) {
            setSection(match.section);
            setSelectedPath(match.path);
          }
          lastRequested.current = requested;
        }
      } catch (failure) {
        if (!signal?.aborted)
          setError(
            failure instanceof Error
              ? failure.message
              : "Could not refresh files.",
          );
      }
    },
    [taskId],
  );
  useEffect(() => {
    const controller = new AbortController();
    // Fetch asynchronously; no state is derived synchronously from the effect.
    const initial = setTimeout(() => void refresh(controller.signal), 0);
    const interval = isGitHubPages
      ? undefined
      : setInterval(() => {
          if (!document.hidden) void refresh(controller.signal);
        }, 5000);
    const onFocus = () => {
      if (!document.hidden) void refresh(controller.signal);
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      controller.abort();
      clearTimeout(initial);
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh]);
  const files = manifest?.files.filter((f) => f.section === section) || [];
  const visibleSections = contentSections.filter((name) => name === "notes" || name === section || manifest?.files.some((file) => file.section === name));
  const selected = files.find((f) => f.path === selectedPath) || files[0];
  const editorPath = manifest && (selected ? `${manifest.folder}/${selected.path}` : `${manifest.folder}/`);
  function openFile(filePath: string) {
    const file = manifest?.files.find((f) => f.path === filePath);
    if (!file) {
      setError(`The linked file is not available: ${filePath}`);
      return;
    }
    setError("");
    setSection(file.section);
    setSelectedPath(file.path);
  }
  async function copyPath() {
    try {
      if (!editorPath) return;
      await navigator.clipboard.writeText(editorPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError(
        "Could not copy the path. Select and copy it from the workspace.",
      );
    }
  }
  return (
    <section
      id="learning-files"
      className="learning-workspace"
      aria-labelledby="learning-files-heading"
    >
      <div className="learning-heading">
        <div>
          <h2 id="learning-files-heading">Your task workspace</h2>
          <p>
            {isGitHubPages
              ? "Edit your Markdown locally. Commit and push it to publish with the next site deployment."
              : "Edit the file in your editor. The preview refreshes when you save."}
          </p>
        </div>
        <div className="learning-actions">
          <span className={`file-sync ${error ? "file-sync-error" : ""}`}>
            <span />
            {error
              ? "Needs attention"
              : manifest
                ? isGitHubPages
                  ? "Published files"
                  : "Auto-refresh · 5s"
                : "Loading files"}
          </span>
          <button
            type="button"
            className="button secondary"
            disabled={refreshing}
            onClick={async () => {
              setRefreshing(true);
              await refresh();
              setRefreshVersion((value) => value + 1);
              setRefreshing(false);
            }}
          >
            <RefreshCw size={14} className={refreshing ? "spin" : ""} />
            Refresh files
          </button>
        </div>
      </div>
      {editorPath && (
        <div className="workspace-path">
          <FolderOpen size={15} />
          <code>{editorPath}</code>
          <button onClick={copyPath} aria-label="Copy file path">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
          <span role="status">{copied ? "Copied" : ""}</span>
        </div>
      )}
      {visibleSections.length > 1 && <div
        className="learning-tabs"
        role="tablist"
        aria-label="Learning content sections"
      >
        {visibleSections.map((s) => {
          const Icon = icons[s];
          return (
            <button
              type="button"
              key={s}
              id={`learning-tab-${s}`}
              role="tab"
              aria-selected={section === s}
              aria-controls="learning-content-panel"
              tabIndex={section === s ? 0 : -1}
              onClick={() => setSection(s)}
              onKeyDown={(event) => {
                if (
                  !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                    event.key,
                  )
                )
                  return;
                event.preventDefault();
                const index = visibleSections.indexOf(s);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? visibleSections.length - 1
                      : (index + (event.key === "ArrowRight" ? 1 : visibleSections.length - 1)) % visibleSections.length;
                setSection(visibleSections[next]);
                document
                  .getElementById(`learning-tab-${visibleSections[next]}`)
                  ?.focus();
              }}
            >
              <Icon size={16} />
              {labels[s]}
              <span>
                {manifest?.files.filter((f) => f.section === s).length ?? "–"}
              </span>
            </button>
          );
        })}
      </div>}
      {error && (
        <div className="content-error" role="alert">
          {error} {manifest && "Showing the last available file list."}
        </div>
      )}
      {manifest?.warnings.map((w) => (
        <p key={w} className="content-warning">
          {w}
        </p>
      ))}
      <div
        className="learning-content"
        id="learning-content-panel"
        role={visibleSections.length > 1 ? "tabpanel" : "region"}
        aria-labelledby={visibleSections.length > 1 ? `learning-tab-${section}` : undefined}
        aria-label={visibleSections.length === 1 ? "Task guide and learning log" : undefined}
      >
        <nav
          className="learning-file-list"
          aria-label={`${labels[section]} files`}
        >
          <div className="small-label">
            {labels[section].toUpperCase()} FILES
          </div>
          {files.map((file) => (
            <button
              key={file.path}
              className={selected?.path === file.path ? "selected" : ""}
              onClick={() => setSelectedPath(file.path)}
              aria-current={selected?.path === file.path ? "true" : undefined}
            >
              {file.kind === "image" ? (
                <ImageIcon size={15} />
              ) : file.kind === "code" ? (
                <Code2 size={15} />
              ) : (
                <FileText size={15} />
              )}
              <span>
                {displayFileName(file)}
                <small>
                  {file.kind} ·{" "}
                  {file.bytes < 1024
                    ? `${file.bytes} B`
                    : `${(file.bytes / 1024).toFixed(1)} KB`}
                </small>
              </span>
            </button>
          ))}
          <div className="file-list-hint">
            Add optional code or result files when you have something to keep.
          </div>
        </nav>
        <div className="learning-viewer">
          {!manifest ? (
            <div className="empty-state">
              <FolderOpen size={26} />
              <h3>
                {error ? "Workspace unavailable" : "Opening your workspace…"}
              </h3>
              <p>
                {error
                  ? "Check that the learning folder exists and the local server is running."
                  : "Reading the files saved for this task."}
              </p>
            </div>
          ) : selected ? (
            <DocumentViewer
              key={`${selected.path}:${selected.revision}:${refreshVersion}`}
              taskId={taskId}
              file={selected}
              files={manifest.files}
              onOpen={openFile}
            />
          ) : (
            <div className="empty-state">
              <FolderOpen size={26} />
              <h3>Make room for your {labels[section].toLowerCase()}</h3>
              <p>
                Save a Markdown document, source file, or supported result in{" "}
                <code>
                  {manifest.folder}/{section}/
                </code>
                .{" "}
                {isGitHubPages
                  ? "Commit and push, then wait for deployment to see it here."
                  : "It will appear here automatically."}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MarkdownCodeBlock({ children }: { children?: ReactNode }) {
  const source = useRef<HTMLPreElement>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const language = isValidElement<{ className?: string }>(children)
    ? children.props.className?.match(/\blanguage-([\w+#.-]+)/)?.[1]
    : undefined;
  return (
    <figure className="learning-code-block">
      <figcaption>
        <span>{language === "text" || !language ? "Plain text" : language}</span>
        <button type="button" onClick={async () => {
          try {
            await navigator.clipboard.writeText(source.current?.textContent ?? "");
            setCopyStatus("Copied");
          } catch {
            setCopyStatus("Select the text to copy it");
          }
        }}>Copy snippet</button>
        {copyStatus && <span role="status">{copyStatus}</span>}
      </figcaption>
      <pre ref={source} tabIndex={0} aria-label={language ? `${language} snippet` : "Plain text snippet"}>{children}</pre>
    </figure>
  );
}

function DocumentViewer({
  taskId,
  file,
  files,
  onOpen,
}: {
  taskId: string;
  file: LearningFile;
  files: LearningFile[];
  onOpen: (path: string) => void;
}) {
  const [documentData, setDocumentData] = useState<LearningDocument | null>(
    null,
  );
  const [error, setError] = useState("");
  const [source, setSource] = useState(false);
  const [copied, setCopied] = useState(false);
  const binary = ["image", "pdf"].includes(file.kind);
  useEffect(() => {
    if (binary) return;
    const controller = new AbortController();
    readJson<LearningDocument>(
      learningFileUrl(taskId, file.path),
      controller.signal,
    )
      .then(setDocumentData)
      .catch((failure) => {
        if (!controller.signal.aborted) setError(failure.message);
      });
    return () => controller.abort();
  }, [taskId, file.path, file.revision, binary]);
  const content = documentData?.content;
  function transformUrl(url: string) {
    if (/^https?:\/\//i.test(url)) return url;
    if (url.startsWith("#")) return url;
    const guideLink = resolveGuideReference(taskId, file.path, url);
    if (guideLink) return guideLink;
    const resolved = resolveLearningLink(file.path, url);
    return resolved && files.some((f) => f.path === resolved)
      ? learningFileUrl(taskId, resolved, true)
      : "";
  }
  return (
    <>
      <div className="document-toolbar">
        <div>
          <strong>{displayFileName(file)}</strong>
          <span>
            {file.kind === "code"
              ? "Source preview · run in your own project"
              : file.kind === "html"
                ? "Static website preview · scripts disabled"
                : file.kind === "pdf"
                  ? "PDF document"
                  : source
                    ? "Source"
                    : "Document preview"}
          </span>
        </div>
        <div className="document-actions">
          {["markdown", "html"].includes(file.kind) && (
            <button onClick={() => setSource(!source)} aria-pressed={source}>
              {source ? "Show preview" : "Show source"}
            </button>
          )}
          {content !== undefined && (
            <button
              aria-label="Copy document source"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(content);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  setError("Copy failed. Use Show source and select the text.");
                }
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
            </button>
          )}
          <a
            href={learningFileUrl(taskId, file.path, true)}
            download={file.name}
            aria-label="Download file"
          >
            <Download size={15} />
          </a>
        </div>
      </div>
      {error ? (
        <div role="alert" className="content-error">
          {error}
        </div>
      ) : file.kind === "image" ? (
        <div className="learning-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${learningFileUrl(taskId, file.path, true)}${isGitHubPages ? "?" : "&"}v=${encodeURIComponent(file.revision)}`}
            alt={file.name}
          />
        </div>
      ) : file.kind === "pdf" ? (
        <div className="empty-state">
          <FileText size={32} />
          <h3>{file.name}</h3>
          <p>Download this document to read it in your PDF viewer.</p>
          <a
            className="button secondary"
            href={learningFileUrl(taskId, file.path, true)}
          >
            Download PDF <Download size={15} />
          </a>
        </div>
      ) : content === undefined ? (
        <div className="empty-state">Reading {file.name}…</div>
      ) : file.kind === "markdown" && !source ? (
        <article className="learning-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { plainText: ["text", "txt", "plaintext", "output"] }]]}
            skipHtml
            urlTransform={transformUrl}
            components={{
              pre: MarkdownCodeBlock,
              a: ({ href, children }) => {
                const linked = files.find(
                  (entry) => learningFileUrl(taskId, entry.path, true) === href,
                )?.path;
                if (linked) {
                  return (
                    <a
                      href={href}
                      onClick={(event) => {
                        event.preventDefault();
                        if (linked) onOpen(linked);
                      }}
                    >
                      {children}
                    </a>
                  );
                }
                return href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                  >
                    {children}
                    {href.startsWith("http") && <ExternalLink size={11} />}
                  </a>
                ) : (
                  <span>{children}</span>
                );
              },
              img: ({ src, alt }) =>
                typeof src === "string" &&
                files.some(
                  (entry) =>
                    entry.kind === "image" &&
                    learningFileUrl(taskId, entry.path, true) === src,
                ) ? (
                  // Local file previews intentionally bypass image optimization.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={alt || "Learning result"} />
                ) : (
                  <span className="content-warning">
                    External image omitted. Save the image in this task folder
                    to display it.
                  </span>
                ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      ) : file.kind === "html" && !source ? (
        <iframe
          className="learning-html"
          title={`${file.name} static preview`}
          sandbox=""
          srcDoc={`<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; base-uri 'none'; form-action 'none'">${content}`}
        />
      ) : (
        <pre className="learning-source">
          <code>{content}</code>
        </pre>
      )}
    </>
  );
}
