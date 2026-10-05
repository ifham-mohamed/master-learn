// One visible-page clock shared by all timer surfaces, rather than one interval per component.
let now = 0;
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();
const tick = () => {
  if (document.hidden) return;
  now = Date.now();
  listeners.forEach((listener) => listener());
};
export function subscribeClock(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    timer = setInterval(tick, 1000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
  }
  const initial = setTimeout(tick, 0);
  return () => {
    clearTimeout(initial);
    listeners.delete(listener);
    if (!listeners.size) {
      clearInterval(timer);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    }
  };
}
export const clockSnapshot = () => now;
export const serverClock = () => 0;
