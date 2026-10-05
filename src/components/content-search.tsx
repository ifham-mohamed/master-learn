"use client";
import Link from "next/link";
import { Search, FileText, ArrowUpRight } from "lucide-react";
import { ToolsHeading } from "./tools-heading";
import { useEffect, useState, useDeferredValue, useMemo } from "react";
import { assetUrl, isGitHubPages } from "@/lib/deployment";
import type { SearchEntry } from "@/lib/content-search";
export function ContentSearch() {
  const [query, setQuery] = useState(""),
    [section, setSection] = useState(""),
    [entries, setEntries] = useState<SearchEntry[]>([]),
    [error, setError] = useState(""),
    [ready, setReady] = useState(false);
  const deferred = useDeferredValue(query.trim().toLowerCase());
  useEffect(() => {
    const abort = new AbortController();
    fetch(isGitHubPages ? assetUrl("/search-index.json") : "/api/search", {
      signal: abort.signal,
    })
      .then((r) => {
        if (!r.ok)
          throw new Error(
            "Search index unavailable. Connect to the internet and reload.",
          );
        return r.json();
      })
      .then((v) => {
        setEntries(v);
        setReady(true);
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      });
    return () => abort.abort();
  }, []);
  const results = useMemo(
    () =>
      deferred.length < 2
        ? []
        : entries
            .filter(
              (e) =>
                (!section || e.section === section) &&
                `${e.id} ${e.title} ${e.path} ${e.text}`
                  .toLowerCase()
                  .includes(deferred),
            )
            .slice(0, 50),
    [entries, deferred, section],
  );
  return (
    <div className="tools-page">
      <ToolsHeading
        eyebrow="YOUR PERSONAL KNOWLEDGE LIBRARY"
        title="Search your learning content"
        description="Find the idea, experiment, or note you want to return to."
      />
      <section className="panel tool-card search-controls">
        <div className="search-fields">
          <label>
            Search documents
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="For example: LEFT JOIN or dependency injection"
            />
          </label>
          <label>
            Section
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="">All sections</option>
              {["theory", "notes", "code", "results", "resources"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="search-help">
          Search theory, notes, code, results, and resources. Images and PDFs
          are not text-indexed; GitHub Pages uses your latest deployed files.
        </p>
      </section>
      <p className="search-status" role="status">
        {error ||
          (!ready
            ? "Loading searchable content…"
            : deferred.length < 2
              ? "Enter at least two characters."
              : `${results.length} results shown (maximum 50).`)}
      </p>
      {ready && !error && !results.length && (
        <div className="search-empty">
          <Search size={32} aria-hidden="true" />
          <h2>
            {deferred.length < 2
              ? "What will you explore?"
              : "No matching documents"}
          </h2>
          <p>
            {deferred.length < 2
              ? "Search a topic, task ID, or something from your notes."
              : "Try a shorter phrase or choose all sections."}
          </p>
          <div className="search-suggestions">
            {["JOIN", "Java", "CS12"].map((term) => (
              <button
                className="button secondary"
                key={term}
                onClick={() => setQuery(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="search-results">
        {results.map((e) => {
          const plain = e.text
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/[#`*>]/g, "")
            .replace(/\s+/g, " ");
          const at = plain.toLowerCase().indexOf(deferred);
          const start = Math.max(0, at - 80);
          const snippet = plain.slice(start, start + 320);
          const match = snippet.toLowerCase().indexOf(deferred);
          return (
            <article
              className="panel tool-card search-result"
              key={e.id + e.path}
            >
              <div className="search-result-meta">
                <span className="tool-id">{e.id}</span>
                <span className="tool-badge">{e.section}</span>
                <FileText size={16} aria-hidden="true" />
              </div>
              <h2>
                <Link
                  href={`/tasks/${e.id}?file=${encodeURIComponent(e.path)}`}
                >
                  {e.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </h2>
              <p className="search-path">{e.path}</p>
              <p className="search-snippet">
                {start > 0 && "..."}
                {match >= 0 ? (
                  <>
                    {snippet.slice(0, match)}
                    <mark>{snippet.slice(match, match + deferred.length)}</mark>
                    {snippet.slice(match + deferred.length)}
                  </>
                ) : (
                  snippet
                )}
                {start + 320 < plain.length && "..."}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
