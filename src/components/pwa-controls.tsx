"use client";
import { useEffect, useState } from "react";
import { assetUrl, isGitHubPages } from "@/lib/deployment";
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
          availability depends on your browser.
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
