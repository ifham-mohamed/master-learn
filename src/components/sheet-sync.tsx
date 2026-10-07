"use client";

import Link from "next/link";
import { SyncSummary } from "./sync-summary";
import { useEffect, useState } from "react";
import { useTracker } from "./tracker-provider";
import { sheetFields, spreadsheetId, type SheetChange } from "@/lib/sheet-sync";

type Connection = {
  configured: boolean;
  connected: boolean;
  missing: string[];
  origin: string;
  redirectUri: string;
  expires: number | null;
};
async function api(action: string, body?: unknown) {
  const response = await fetch(`/api/google/${action}`, {
    method: body ? "POST" : "GET",
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : {},
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data.error || "Could not complete the Google request.");
  return data;
}
export function SheetSync() {
  const { localProgress,recordSync } = useTracker();
  const [connection, setConnection] = useState<Connection | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState<{
    changes: SheetChange[];
    local: string;
  } | null>(null);
  const [acceptConflicts, setAcceptConflicts] = useState(false);
  const local = JSON.stringify(localProgress);
  const current = review?.local === local;
  const conflicts = review?.changes.some((change) => change.conflict);
  const token = connection?.connected;
  const clientId = connection?.configured;
  useEffect(() => {
    let active = true;
    api("status")
      .then((data) => {
        if (active) {
          setConnection(data);
          if (
            new URLSearchParams(window.location.search).get("connection") ===
            "failed"
          )
            setError(
              "Google connection was not completed. Check the client secret, callback URL and consent, then try again.",
            );
        }
      })
      .catch((failure) => {
        if (active) setError(failure.message);
      });
    return () => {
      active = false;
    };
  }, []);
  async function connect() {
    setBusy(true);
    setError("");
    try {
      const data = await api("connect", {});
      window.location.assign(data.url);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not connect.",
      );
      setBusy(false);
    }
  }
  async function disconnect() {
    setBusy(true);
    setError("");
    try {
      const data = await api("disconnect", {});
      setConnection((previous) =>
        previous ? { ...previous, connected: false } : previous,
      );
      setReview(null);
      setMessage(data.message);
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not disconnect.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function preview() {
    setBusy(true);
    setError("");
    setMessage("");
    setReview(null);
    setAcceptConflicts(false);
    try {
      const data = await api("review", { local: JSON.parse(local) });
      setReview({ changes: data.changes, local });
      if (!data.changes.length) await recordSync(JSON.parse(local));
      if (!data.changes.length)
        setMessage("No pending differences in your locally edited fields.");
    } catch (failure) {
      setError(
        failure instanceof Error ? failure.message : "Could not review.",
      );
      api("status")
        .then(setConnection)
        .catch(() => {});
    } finally {
      setBusy(false);
    }
  }
  async function sync() {
    if (
      !review ||
      !current ||
      !review.changes.length ||
      (conflicts && !acceptConflicts)
    )
      return;
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const data = await api("sync", {
        local: JSON.parse(local),
        acceptConflicts,
      });
      await recordSync(JSON.parse(local));
      setMessage(data.message);
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Could not sync. Review again before retrying.",
      );
    } finally {
      setReview(null);
      setBusy(false);
    }
  }
  return (
    <>
      <SyncSummary />
      <div className="page-heading">
        <div>
          <h1>Connect your learning progress</h1>
          <p>
            Review the exact Master Plan cells before sending changes to your
            Google spreadsheet.
          </p>
        </div>
      </div>
      <section className="panel detail-panel">
        <h2>1. Connect to Google Sheets</h2>
        <p>
          Your Google connection survives refreshes and browser restarts for up
          to 30 days. Tokens are encrypted on this server and renewed
          automatically; this browser keeps only an HttpOnly session identifier.
          Google expiry or revoked permission may require reconnection. No
          database is needed.
        </p>
        <p>
          <a
            className="back-link"
            href={`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=803047853`}
            target="_blank"
            rel="noreferrer"
          >
            Open Final Tracker · Master Plan ↗
          </a>
        </p>
        {connection?.connected && (
          <p role="status" className="inline-notice">
            Connected securely. Your connection survives refreshes.{" "}
            {connection.expires
              ? `Session ends ${new Date(connection.expires).toLocaleDateString()}.`
              : ""}
          </p>
        )}
        {connection && !connection.configured && (
          <p>Still needed: {connection.missing.join(", ")}</p>
        )}
        {!connection ? (
          <p role="status">Checking your saved Google connection...</p>
        ) : !clientId ? (
          <div className="inline-notice">
            One-time setup is needed before sign-in. Follow the instructions
            below, add the server credentials and register the callback URL,
            then restart Learnspace.
          </div>
        ) : (
          <div className="sync-actions">
            <button
              className="button secondary"
              disabled={busy || !connection}
              onClick={connect}
            >
              {token ? "Reconnect Google account" : "Sign in with Google"}
            </button>
            {token && (
              <button
                className="button secondary"
                disabled={busy}
                onClick={disconnect}
              >
                Disconnect Google
              </button>
            )}
          </div>
        )}
      </section>
      <section className="panel detail-panel">
        <h2>2. Review your changes</h2>
        <p>
          {Object.keys(localProgress).length} locally updated tasks. Edit a task
          and save its progress first. Only fields changed locally from the
          imported snapshot are proposed; untouched fields and formulas stay
          intact.
        </p>
        <div className="sync-actions">
          <Link href="/plan" className="button secondary">
            Open Master plan
          </Link>
          <button
            className="button primary"
            disabled={!token || busy}
            onClick={preview}
          >
            {busy ? "Working…" : "Review changes"}
          </button>
        </div>
        {error && (
          <p role="alert" className="content-error">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="inline-notice">
            {message}
          </p>
        )}
        {review && (
          <>
            <p>
              {review.changes.length} cells proposed. Completed-on dates use
              Google Sheets date numbers to preserve date arithmetic and
              existing formatting.
            </p>
            {!current && (
              <p role="alert">Your local progress changed. Review again.</p>
            )}
            <div className="sync-table">
              <table>
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Field / cell</th>
                    <th>Currently in Sheets</th>
                    <th>Your change</th>
                  </tr>
                </thead>
                <tbody>
                  {review.changes.map((change) => (
                    <tr key={change.range}>
                      <td>
                        <Link href={`/tasks/${change.id}`}>{change.id}</Link>
                      </td>
                      <td>
                        {change.field}
                        <small>{change.range}</small>
                        {change.conflict && (
                          <strong>Changed in Sheets since import</strong>
                        )}
                      </td>
                      <td>{String(change.before) || "(empty)"}</td>
                      <td>{String(change.displayAfter) || "(empty)"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {conflicts && (
              <label className="sync-consent">
                <input
                  type="checkbox"
                  checked={acceptConflicts}
                  onChange={(event) => setAcceptConflicts(event.target.checked)}
                />
                I reviewed the conflicting cells and want my displayed values to
                replace them.
              </label>
            )}
            <button
              className="button primary"
              disabled={
                busy ||
                !current ||
                !review.changes.length ||
                (!!conflicts && !acceptConflicts)
              }
              onClick={sync}
            >
              Sync to Google Sheets
            </button>
          </>
        )}
      </section>
      <details className="panel detail-panel" open={!clientId}>
        <summary>Google connection setup · no database</summary>
        <div className="learning-prose">
          <ol>
            <li>
              Open{" "}
              <a
                href="https://console.cloud.google.com/"
                target="_blank"
                rel="noreferrer"
              >
                Google Cloud Console
              </a>
              , select/create a project, and enable the Google Sheets API.
            </li>
            <li>
              Configure Google Auth Platform branding and audience. For a
              personal app in Testing, add your own Google account as a test
              user.
            </li>
            <li>
              Keep your existing Web application OAuth client. Under Authorized
              redirect URIs add the exact callback shown here:{" "}
              <code>
                {connection?.redirectUri ||
                  "http://localhost:3100/api/google/callback"}
              </code>
              . Use this same origin when opening the app.
            </li>
            <li>
              In <code>.env.local</code> (or your hosting environment settings),
              keep your existing client ID and add{" "}
              <code>GOOGLE_CLIENT_SECRET</code> (server-only),{" "}
              <code>GOOGLE_SESSION_KEY</code> (64 random hex characters), and{" "}
              <code>
                APP_ORIGIN={connection?.origin || "http://localhost:3100"}
              </code>
              . Never use NEXT_PUBLIC for a secret. See{" "}
              <code>docs/GOOGLE-SESSION-SETUP.md</code> for instructions. For
              hosting from GitHub, follow <code>docs/DEPLOYMENT.md</code>.
            </li>
            <li>
              Restart development, or rebuild and restart production. Open this
              page at your registered origin, sign in with an account that can
              edit Final Tracker, then review and sync.
            </li>
          </ol>
          <p>
            If moving from 127.0.0.1 to localhost, existing browser progress
            will remain at the old address. Export it there for your records and
            keep using the origin with your progress when possible; automatic
            backup import is not implemented.
          </p>
          <p>
            <a
              href="https://developers.google.com/identity/protocols/oauth2/web-server"
              target="_blank"
              rel="noreferrer"
            >
              Google server-side setup documentation
            </a>{" "}
            ·{" "}
            <a
              href="https://developers.google.com/workspace/sheets/api/limits"
              target="_blank"
              rel="noreferrer"
            >
              Standard API use has no additional charge, subject to quotas
            </a>
          </p>
        </div>
      </details>
      <section className="panel detail-panel">
        <h2>Fields this connection can update</h2>
        <div className="sync-field-grid">
          {sheetFields.map(([key, label, column]) => (
            <div key={key}>
              <strong>{column}</strong> {label}
            </div>
          ))}
        </div>
        <p>
          Due date (J), Review due (S), Completion check (AD), and Category key
          (AE) are calculated. Category tabs and dashboards remain controlled by
          the workbook formulas. Task definitions, scheduling, estimates, and
          source references are not synced by this progress-only connection.
        </p>
        <p>
          This is a manual push of progress, not two-way curriculum
          synchronization. Avoid editing the sheet during a sync: it is checked
          again before writing, but Google does not provide a cell-level lock
          for this operation.
        </p>
      </section>
    </>
  );
}
