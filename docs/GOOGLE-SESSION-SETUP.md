# Keep Google Sheets connected across reloads

This replaces the old browser-only token flow. Google tokens are stored in AES-256-GCM encrypted files under `.local/google-sessions/`. The browser holds an opaque HttpOnly, SameSite=Lax cookie; HTTPS also uses Secure. No database is required. Local HTTP is allowed only for loopback development. Keep the app on one origin.

## One-time migration

1. Open Google Cloud Console → Google Auth Platform → Clients → your existing Web application client.
2. Under **Authorized redirect URIs**, add `http://localhost:3100/api/google/callback`. This is a redirect URI, not a JavaScript origin. For port 3000, register `http://localhost:3000/api/google/callback` and set APP_ORIGIN accordingly.
3. Copy the client secret into `.env.local` as `GOOGLE_CLIENT_SECRET=...`. Do not paste it into chat or prefix it with NEXT_PUBLIC. If Google no longer displays the secret, create/rotate a secret for that OAuth client using the console. Review any effect on other apps using that client.
4. Run `node scripts/setup-google-session.mjs`. This creates a random encryption key if absent and preserves the existing client ID. It does not print credentials.
5. Your file should contain these names:

```dotenv
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-existing-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-server-only-client-secret
GOOGLE_SESSION_KEY=64-random-hex-characters-generated-by-the-setup-script
APP_ORIGIN=http://localhost:3100
```

6. Rebuild after code changes and restart the app. Server-only secret changes require a restart. Open `http://localhost:3100/sync`, connect once, grant offline Sheets access, and return to the app. Refresh: it should still show Connected securely. Review and sync continue to require your explicit actions.

## What persists

- A connection lasts up to 30 days locally, survives browser/server restarts, and automatically renews expiring access tokens when making Sheets requests.
- Google can revoke or expire access earlier. External OAuth apps in Testing with Sheets permission normally have refresh tokens that expire after seven days. Refresh-safe does not mean permanent authorization.
- Disconnect deletes the local session and attempts to revoke access at Google. A revocation failure is explicitly reported, with a link to account permissions as a fallback.
- Clearing cookies, deleting `.local`, changing the encryption key, or changing APP_ORIGIN requires reconnection. Local learning files and browser progress are separate and are kept.
- The callback verifies a short-lived single-use state and PKCE. All POST endpoints enforce the configured origin. Reviews expire after ten minutes and are rechecked on the server before writing. Tokens and authorization codes are not returned to the client or logged by the app.

## Deployment limits

Use a single trusted Node.js server with persistent local disk. Do not expose this personal app publicly without application-level access control. Multi-instance/serverless deployment needs a shared session store. Protect `.env.local` and `.local/` with OS permissions; Windows inherits directory ACLs, so restrict this workspace to your Windows account. Neither path is committed to Git. Encryption protects the stored token files only while the key remains private. Keep the session key stable across restarts; remove obsolete encrypted sessions during maintenance. HTTPS is required for non-loopback deployments.

[Google server-side OAuth and offline access](https://developers.google.com/identity/protocols/oauth2/web-server) · [Refresh-token expiration rules](https://developers.google.com/identity/protocols/oauth2#expiration) · [Google account permissions](https://myaccount.google.com/permissions)

For hosted setup, follow [the deployment guide](DEPLOYMENT.md). The supplied hosted startup requires HTTPS, persistent session storage, and a private app password.
