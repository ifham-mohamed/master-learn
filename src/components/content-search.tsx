"use client";
import Link from "next/link";
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
      <h1>Search your learning content</h1>
      <p>
        Search theory, notes, source code, results, and resources. Images and
        PDFs are not text-indexed. GitHub Pages searches the latest deployed
        files.
      </p>
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
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="">All sections</option>
          {["theory", "notes", "code", "results", "resources"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <p role="status">
        {error ||
          (!ready
            ? "Loading searchable content…"
            : deferred.length < 2
              ? "Enter at least two characters."
              : `${results.length} results shown (maximum 50).`)}
      </p>
      {results.map((e) => {
        const at = e.text.toLowerCase().indexOf(deferred);
        return (
          <article className="panel tool-card" key={e.id + e.path}>
            <Link href={`/tasks/${e.id}?file=${encodeURIComponent(e.path)}`}>
              {e.id} · {e.title} → {e.path}
            </Link>
            <p>
              {e.text.slice(Math.max(0, at - 80), Math.max(0, at - 80) + 320)}
            </p>
          </article>
        );
      })}
    </div>
  );
}
