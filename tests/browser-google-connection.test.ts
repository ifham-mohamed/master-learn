import test from "node:test";
import assert from "node:assert/strict";
import { createBrowserGoogleConnection } from "../src/lib/browser-google-connection";

test("Google connection survives view subscriptions but rejects expiry and resets with a new page runtime", () => {
  const store = createBrowserGoogleConnection();
  let notifications = 0;
  const unsubscribe = store.subscribe(() => notifications++);
  store.set({ token: "test-only-token", expires: 2000 });
  unsubscribe();
  assert.equal(store.valid(1000)?.token, "test-only-token");
  assert.equal(store.valid(2000), null);
  assert.equal(createBrowserGoogleConnection().get(), null);
  store.set(null);
  assert.equal(store.get(), null);
  assert.equal(notifications, 1);
});
