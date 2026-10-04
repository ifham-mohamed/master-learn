"use client";

import { useSyncExternalStore, useRef } from "react";
import { Moon, Sun } from "lucide-react";

const key = "learnspace-theme";
const subscribe = (callback: () => void) => {
  window.addEventListener("themechange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("themechange", callback);
    window.removeEventListener("storage", callback);
  };
};
const snapshot = () => document.documentElement.dataset.theme === "dark";

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  const busy = useRef(false);
  async function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (busy.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    const apply = () => {
      const theme = dark ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem(key, theme);
      } catch {
        /* Works without persistence. */
      }
      window.dispatchEvent(new Event("themechange"));
    };
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }
    busy.current = true;
    const transition = document.startViewTransition(apply);
    try {
      await transition.ready;
      await document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: "cubic-bezier(.2,.7,.2,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished;
    } catch {
      /* Unsupported animation falls back to the applied theme. */
    } finally {
      busy.current = false;
    }
  }
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
