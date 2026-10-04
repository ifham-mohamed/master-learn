const KEY = "learnspace-sidebar-collapsed";
const EVENT = "learnspace-sidebar-change";
let fallback = false;

export function getSidebarSnapshot() {
  try {
    return window.localStorage.getItem(KEY) === "true";
  } catch {
    return fallback;
  }
}
export function subscribeSidebar(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(EVENT, notify);
  };
}
export function setSidebarCollapsed(value: boolean) {
  fallback = value;
  try {
    window.localStorage.setItem(KEY, String(value));
  } catch {
    /* Remain usable when persistence is unavailable. */
  }
  window.dispatchEvent(new Event(EVENT));
}
export const expandedServerSnapshot = () => false;
export function subscribeMobile(notify: () => void) {
  const media = window.matchMedia("(max-width: 760px)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}
export const getMobileSnapshot = () =>
  window.matchMedia("(max-width: 760px)").matches;
