type Connection = { token: string; expires: number };

/** Page-memory only: survives client-side navigation, never a browser reload. */
export function createBrowserGoogleConnection() {
  let value: Connection | null = null;
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    valid: (now = Date.now()) => (value && value.expires > now ? value : null),
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    set(next: Connection | null) {
      value = next;
      listeners.forEach((listener) => listener());
    },
  };
}
export const browserGoogleConnection = createBrowserGoogleConnection();
export const emptyGoogleConnection = () => null;
