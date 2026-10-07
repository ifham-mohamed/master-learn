"use client";
import { useEffect, useState } from "react";
import { assetUrl, isGitHubPages } from "@/lib/deployment";
import {
  learningFileUrl,
  learningManifestUrl,
  type LearningManifest,
} from "@/lib/learning-types";
type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};
export function InstallApp({
  expanded = false,
  statusOnly = false,
}: {
  expanded?: boolean;
  statusOnly?: boolean;
}) {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null),
    [installed, setInstalled] = useState(false),
    [help, setHelp] = useState(false),
    [offline, setOffline] = useState(false),
    [update, setUpdate] = useState<ServiceWorkerRegistration | null>(null),
    [message, setMessage] = useState("");
  useEffect(() => {
    const check = () => {
      setOffline(!navigator.onLine);
      setInstalled(matchMedia("(display-mode: standalone)").matches);
    };
    check();
    const install = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallEvent);
    };
    const done = () => {
      setInstalled(true);
      setPrompt(null);
    };
    window.addEventListener("beforeinstallprompt", install);
    window.addEventListener("appinstalled", done);
    window.addEventListener("online", check);
    window.addEventListener("offline", check);
    let alive = true;
    let reg: ServiceWorkerRegistration | undefined;
    const inspect = () => {
      if (reg?.waiting && alive) setUpdate(reg);
    };
    if (isGitHubPages && "serviceWorker" in navigator)
      navigator.serviceWorker
        .register(assetUrl("/sw.js"), { scope: assetUrl("/") })
        .then((r) => {
          reg = r;
          inspect();
          r.addEventListener("updatefound", () => {
            r.installing?.addEventListener("statechange", inspect);
          });
        })
        .catch(() => {
          if (alive)
            setMessage(
              "Offline setup unavailable. You can still use the website online.",
            );
        });
    // Offline document navigation must request cached HTML rather than a Next.js flight response.
    const offlineNavigation = (e: MouseEvent) => {
      if (
        navigator.onLine ||
        e.defaultPrevented ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      )
        return;
      const a = (e.target as Element)?.closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href);
      if (url.origin === location.origin && !url.hash) {
        e.preventDefault();
        e.stopPropagation();
        location.assign(url.href);
      }
    };
    document.addEventListener("click", offlineNavigation, true);
    return () => {
      alive = false;
      window.removeEventListener("beforeinstallprompt", install);
      window.removeEventListener("appinstalled", done);
      window.removeEventListener("online", check);
      window.removeEventListener("offline", check);
      document.removeEventListener("click", offlineNavigation, true);
    };
  }, []);
  if (!isGitHubPages)
    return expanded ? (
      <p>
        Mobile installation and offline downloads are available in the published
        GitHub Pages app. Use the Pages preview to test them locally.
      </p>
    ) : null;
  if (statusOnly && !offline && !update && !message) return null;
  return (
    <div className="install-controls">
      {offline && (
        <span role="status">Offline · local progress still saves</span>
      )}
      {!installed && !statusOnly && (
        <button
          className="button secondary"
          onClick={async () => {
            if (prompt) {
              await prompt.prompt();
              const result = await prompt.userChoice;
              setPrompt(null);
              setMessage(
                result.outcome === "accepted"
                  ? "Installation requested."
                  : "You can install later from your browser menu.",
              );
            } else setHelp(!help);
          }}
        >
          Install Learnspace
        </button>
      )}
      {installed && expanded && <p>Running as an installed app.</p>}
      {(help || expanded) && (
        <p>
          Android/desktop: choose Install in your browser menu. iPhone/iPad:
          open in Safari, tap Share → Add to Home Screen. Installation
          availability depends on your browser. Download task files from a task
          page for offline reading.
        </p>
      )}
      {update && (
        <button
          className="button secondary"
          onClick={() => {
            update.waiting?.postMessage({ type: "ACTIVATE" });
            setMessage(
              "Update activated. Save any unfinished form, then reload to use it.",
            );
            setUpdate(null);
          }}
        >
          Update available · activate
        </button>
      )}
      <span role="status">{message}</span>
    </div>
  );
}
export function OfflineTask({ id }: { id: string }) {
  const [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false);
  if (!isGitHubPages) return null;
  return (
    <div className="offline-task">
      <h3>Read this task offline</h3>
      <p>
        Download its documents and attachments while online. Downloads stay on
        this device; browser storage may be cleared. Activating an app update
        clears downloaded tasks to avoid mixing versions; download them again
        afterward.
      </p>
      <button
        className="button secondary"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setMessage("Downloading task…");
          try {
            if (!("serviceWorker" in navigator))
              throw new Error(
                "This browser does not support offline downloads.",
              );
            const response = await fetch(learningManifestUrl(id));
            if (!response.ok) throw new Error("Could not read task files.");
            const manifest: LearningManifest = await response.json();
            if (
              manifest.files.reduce((sum, f) => sum + f.bytes, 0) >
              50 * 1024 * 1024
            )
              throw new Error(
                "This task exceeds the 50 MB download limit. Download individual files instead.",
              );
            const cache = await caches.open("learnspace-tasks-v1");
            const urls = [
              assetUrl(`/tasks/${id}/`),
              learningManifestUrl(id),
              ...manifest.files.flatMap((f) =>
                ["image", "pdf"].includes(f.kind)
                  ? [learningFileUrl(id, f.path, true)]
                  : [
                      learningFileUrl(id, f.path),
                      learningFileUrl(id, f.path, true),
                    ],
              ),
            ];
            for (let i = 0; i < urls.length; i += 4)
              await Promise.all(
                urls.slice(i, i + 4).map(async (url) => {
                  const r = await fetch(url, { cache: "reload" });
                  if (!r.ok)
                    throw new Error(
                      "Download incomplete. Reconnect and retry.",
                    );
                  await cache.put(url, r);
                }),
              );
            const registration = await Promise.race([
              navigator.serviceWorker.ready,
              new Promise<never>((_, reject) =>
                setTimeout(
                  () =>
                    reject(
                      new Error(
                        "Offline setup timed out. Reload online and retry.",
                      ),
                    ),
                  15000,
                ),
              ),
            ]);
            if (!registration.active)
              throw new Error("Offline setup is still preparing. Try again.");
            setMessage(
              `${manifest.files.length} files downloaded. Keep a backup of local progress too.`,
            );
          } catch (error) {
            setMessage(
              error instanceof Error ? error.message : "Download failed.",
            );
          } finally {
            setBusy(false);
          }
        }}
      >
        Download task for offline use
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
