"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  browserGoogleConnection as connectionStore,
  emptyGoogleConnection,
} from "@/lib/browser-google-connection";
import { useTracker } from "./tracker-provider";
import {
  planSheetChanges,
  readMasterPlan,
  sheetFields,
  sheetsRequest,
  spreadsheetId,
  type SheetChange,
} from "@/lib/sheet-sync";

type TokenResponse = {
  access_token?: string;
  error?: string;
  scope?: string;
  expires_in?: number;
};
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            prompt?: string;
            callback: (response: TokenResponse) => void;
            error_callback: () => void;
          }): { requestAccessToken(): void };
          revoke(token: string, callback: () => void): void;
        };
      };
    };
  }
}
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const scope = "https://www.googleapis.com/auth/spreadsheets";
const rememberedKey = `learnspace-google-previous-connection:${clientId}`;
function wasConnected() {
  try {
    return localStorage.getItem(rememberedKey) === "yes";
  } catch {
    return false;
  }
}
function rememberConnection(value: boolean) {
  try {
    if (value) localStorage.setItem(rememberedKey, "yes");
    else localStorage.removeItem(rememberedKey);
  } catch {}
  window.dispatchEvent(new Event("learnspace-google-history"));
}
function subscribeHistory(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener("learnspace-google-history", listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener("learnspace-google-history", listener);
  };
}
export function BrowserSheetSync() {
  const { localProgress } = useTracker();
  const [ready, setReady] = useState(false);
  const connection = useSyncExternalStore(
    connectionStore.subscribe,
    connectionStore.get,
    emptyGoogleConnection,
  );
  const token = connection?.token || "";
  const expires = connection?.expires || 0;
  const remembered = useSyncExternalStore(
    subscribeHistory,
    wasConnected,
    () => false,
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [review, setReview] = useState<{
    changes: SheetChange[];
    local: string;
    expires: number;
  } | null>(null);
  const [acceptConflicts, setAcceptConflicts] = useState(false);
  const local = JSON.stringify(localProgress);
  const current = review?.local === local;
  const conflicts = review?.changes.some((change) => change.conflict);
  useEffect(() => {
    if (!token) return;
    const timeout = setTimeout(
      () => {
        connectionStore.set(null);
        setReview(null);
        setMessage("Google access expired. Sign in again to review and sync.");
      },
      Math.max(0, expires - Date.now()),
    );
    return () => clearTimeout(timeout);
  }, [token, expires]);
  function connect(chooseAccount = false) {
    if (!window.google || busy) return;
    setBusy(true);
    setError("");
    setMessage("");
    setReview(null);
    window.google?.accounts.oauth2
      .initTokenClient({
        client_id: clientId,
        scope,
        prompt: chooseAccount || !remembered ? "select_account" : "",
        callback: (response) => {
          setBusy(false);
          if (
            !response.access_token ||
            response.error ||
            !response.scope?.split(" ").includes(scope)
          ) {
            setError(
              "Google access was not granted. Sign in and allow Sheets access to continue.",
            );
            return;
          }
          connectionStore.set({
            token: response.access_token,
            expires: Date.now() + (response.expires_in || 3600) * 1000 - 30000,
          });
          rememberConnection(true);
          setMessage(
            "Connected for this session. Review changes before syncing.",
          );
        },
        error_callback: () => {
          setBusy(false);
          setError(
            "Google sign-in was closed or blocked. Allow the popup and try again.",
          );
        },
      })
      .requestAccessToken();
  }
  async function preview() {
    setBusy(true);
    setError("");
    setMessage("");
    setReview(null);
    setAcceptConflicts(false);
    try {
      if (!connectionStore.valid())
        throw new Error("Reconnect Google before reviewing changes.");
      const changes = planSheetChanges(
        await readMasterPlan(token),
        JSON.parse(local),
      );
      setReview({ changes, local, expires: Date.now() + 600000 });
      if (!changes.length)
        setMessage(
          "No pending differences in your locally edited fields. The app does not import unrelated spreadsheet edits.",
        );
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : "Could not review changes.",
      );
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
      if (Date.now() >= expires || Date.now() >= review.expires)
        throw new Error(
          "Connection or review expired. Sign in and review again.",
        );
      const latest = planSheetChanges(
        await readMasterPlan(token),
        JSON.parse(local),
      );
      if (JSON.stringify(latest) !== JSON.stringify(review.changes)) {
        setReview(null);
        throw new Error(
          "The spreadsheet changed after your review. Review again before syncing.",
        );
      }
      await sheetsRequest(token, "values:batchUpdate", {
        valueInputOption: "RAW",
        data: latest.map((change) => ({
          range: change.range,
          values: [[change.after]],
        })),
      });
      const remaining = planSheetChanges(
        await readMasterPlan(token),
        JSON.parse(local),
      );
      setReview(null);
      if (remaining.length)
        throw new Error(
          "The write was sent, but verification found differences. Review again before retrying.",
        );
      setMessage(
        `Verified ${latest.length} updated cells in Master Plan. Google Sheets recalculates its linked formulas. Local progress remains saved on this device.`,
      );
    } catch (failure) {
      setReview(null);
      setError(
        failure instanceof Error
          ? failure.message
          : "Sync could not be verified. Review again before retrying.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {clientId && (
        <Script
          src="https://accounts.google.com/gsi/client"
          onReady={() => setReady(true)}
          onError={() =>
            setError(
              "Google sign-in could not load. Check your connection or browser blocking settings.",
            )
          }
        />
      )}
      <div className="page-heading">
        <div>
          <div className="eyebrow">REVIEW · SYNC · VERIFY</div>
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
          GitHub Pages connects directly to Google. No backend, client secret,
          or database is needed. Access is held in memory for this session;
          reconnect after a reload. Google requests permission to access
          spreadsheets, while this app targets only your linked Final Tracker
          workbook.
        </p>
        <p className="inline-notice" role="status">
          {token
            ? "Connected to Google Sheets. You can move between app pages without reconnecting."
            : remembered
              ? "You previously connected Google. Your learning progress is safe. After a refresh, click Reconnect Google to renew access; Google may ask you to choose an account."
              : "Google authorization is separate from your saved learning progress. Connect when you are ready to review and sync."}
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
        {!clientId ? (
          <div className="inline-notice">
            One-time setup is needed before sign-in. Follow the instructions
            below, add your OAuth client ID, then redeploy GitHub Pages.
          </div>
        ) : (
          <div className="sync-actions">
            <button
              className="button secondary"
              disabled={!ready || busy}
              onClick={() => connect()}
            >
              {busy
                ? "Working…"
                : token
                  ? "Renew Google access"
                  : remembered
                    ? "Reconnect Google"
                    : "Sign in with Google"}
            </button>
            {remembered && (
              <button
                className="button secondary"
                disabled={!ready || busy}
                onClick={() => connect(true)}
              >
                Use another Google account
              </button>
            )}
            {token && (
              <button
                className="button secondary"
                disabled={busy}
                onClick={() => {
                  window.google?.accounts.oauth2.revoke(token, () => {});
                  connectionStore.set(null);
                  rememberConnection(false);
                  setReview(null);
                  setMessage("Disconnected. Local progress has been kept.");
                }}
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
        <summary>One-time free setup · no database</summary>
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
              Create an OAuth client with application type Web application. Add
              the exact JavaScript origins you use, such as{" "}
              <code>https://ifham-mohamed.github.io</code> and{" "}
              <code>http://localhost:3100</code>. Use the same hostname
              consistently because local progress belongs to that origin. Google
              may reject raw IP origins; localhost is the simplest local setup.
            </li>
            <li>
              In GitHub repository Settings → Secrets and variables → Actions →
              Variables, set{" "}
              <code>
                NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
              </code>
              . This is a public client identifier; do not add a client secret.
            </li>
            <li>
              Push a commit or rerun the Deploy GitHub Pages workflow. Open this
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
              href="https://developers.google.com/identity/oauth2/web/guides/use-token-model"
              target="_blank"
              rel="noreferrer"
            >
              Google token setup documentation
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
