"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  learningFileUrl,
  learningManifestUrl,
  resolveLearningLink,
  type ContentSection,
  type LearningManifest,
  type LearningDocument,
  type LearningFile,
} from "@/lib/learning-types";

const labels: Record<ContentSection, string> = {
  theory: "Theory",
  notes: "Notes",
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
async function readJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { cache: isGitHubPages ? "default" : "no-store", signal });
  const data = await response.json();
  if (!response.ok || data.error)
    throw new Error(data.error || "Could not load the learning content.");
  return data;
}

export function LearningWorkspace({ taskId }: { taskId: string }) {
  const [manifest, setManifest] = useState<LearningManifest | null>(null);
  const [section, setSection] = useState<ContentSection>("theory");
  const [selectedPath, setSelectedPath] = useState("");
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
        const requested=new URLSearchParams(window.location.search).get('file');
        const match=data.files.find(f=>f.path===requested);
        if(match){setSection(match.section);setSelectedPath(match.path);}
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
  const selected = files.find((f) => f.path === selectedPath) || files[0];
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
      await navigator.clipboard.writeText(manifest?.folder || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setError(
        "Could not copy the folder path. Select and copy the path shown below.",
      );
    }
  }
  return (
    <section
      className="learning-workspace"
      aria-label="Task learning workspace"
    >
      <Link className="workspace-help-link" href="/guide">
        New here? Read the learning & coding guide →
      </Link>
      <div className="learning-heading">
        <div>
          <h2>Your task workspace</h2>
          <p>
            Your files, connected to your learning. Save in your editor and read
            them here.{" "}
            {isGitHubPages &&
              "On GitHub Pages, commit and push your files; they appear after the next deployment."}
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
      {manifest && (
        <div className="workspace-path">
          <FolderOpen size={15} />
          <code>{manifest.folder}/</code>
          <button onClick={copyPath} aria-label="Copy task folder path">
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
          <span role="status">{copied ? "Copied" : ""}</span>
        </div>
      )}
      <div
        className="learning-tabs"
        role="tablist"
        aria-label="Learning content sections"
      >
        {contentSections.map((s) => {
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
                const index = contentSections.indexOf(s);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 4
                      : (index + (event.key === "ArrowRight" ? 1 : 4)) % 5;
                setSection(contentSections[next]);
                document
                  .getElementById(`learning-tab-${contentSections[next]}`)
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
      </div>
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
        role="tabpanel"
        aria-labelledby={`learning-tab-${section}`}
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
                {file.path.split("/").slice(1).join("/")}
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
            Add files inside <code>{section}/</code>.<br />
            Nested folders work too.
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
      <div className="learning-workflow-note">
        <BookOpen size={16} />
        <span>
          <strong>A simple learning loop:</strong> understand the theory →
          capture your reasoning → run the code → record actual results.
          Templates are starting points; they do not mark your task complete.
        </span>
      </div>
    </section>
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
    const resolved = resolveLearningLink(file.path, url);
    return resolved && files.some((f) => f.path === resolved)
      ? learningFileUrl(taskId, resolved, true)
      : "";
  }
  return (
    <>
      <div className="document-toolbar">
        <div>
          <strong>{file.name}</strong>
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
            skipHtml
            urlTransform={transformUrl}
            components={{
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
