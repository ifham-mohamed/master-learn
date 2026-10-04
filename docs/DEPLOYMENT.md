# Deploy from GitHub with all features

GitHub stores the project and runs checks; **Render runs the website**. This app needs Node.js for its learning-file reader and encrypted Google sessions. GitHub Pages cannot run this backend. No database is needed.

The supplied `render.yaml` uses one paid Node web service and a 1 GB persistent disk. Render's free services do not support persistent disks. Review [current pricing](https://render.com/pricing) before creating anything. No paid service or public deployment has been created by these changes.

## 1. Prepare GitHub

Run from the project directory:

```sh
npm ci
npm test
npm run lint
npm run build
npm run typecheck
git status
```

Review the tracked learning notes, results, and original workbook data. Use a private repository for personal content. Never commit `.env.local`, `.local/`, Google credentials, or the app password; the first two paths are already ignored.

The configured remote is `git@github.com:ifham-mohamed/master-learn.git`. Publish reviewed commits:

```sh
git push origin main
```

Wait for **Application checks** in GitHub Actions. The workflow requires no Google secrets and does not deploy a Pages site. Disable an older Pages deployment if you configured one for this repository.

## 2. Create the host

1. Sign in to [Render](https://dashboard.render.com/) and connect GitHub with access to this repository.
2. Choose **New → Blueprint**, select the repository, branch `main`, and root `render.yaml`.
3. Review the paid service and disk before creating them. Keep one instance and the persistent disk; do not choose a static site or free instance.
4. Enter the environment values below. If Render has not assigned your address yet, temporarily enter `https://placeholder.example` for APP_ORIGIN; replace it immediately after creation, before Google sign-in.
5. Create the Blueprint. Copy the assigned HTTPS origin, for example `https://master-learn-xxxx.onrender.com`. Do not assume this example name is available.
6. Set **Environment → APP_ORIGIN** to the actual origin without a trailing slash; save and redeploy.

| Variable | Value |
| --- | --- |
| `GOOGLE_CLIENT_ID` | Your Web application OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Its secret, entered directly in Render. |
| `GOOGLE_SESSION_KEY` | A stable random 64-character hexadecimal key. Generate below. |
| `APP_ORIGIN` | Your exact assigned HTTPS origin, with no path or trailing slash. |
| `APP_ACCESS_PASSWORD` | A unique password of at least 20 characters from your password manager. Username is `learner`. |
| `GOOGLE_SESSION_DIR` | `/var/data/google-sessions`, already supplied by the Blueprint. |

Generate a separate hosted encryption key locally. This intentionally prints the new secret in **your own terminal**. Paste it directly into Render and your password manager; do not share its output or commit it:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the key unchanged during later deployments. Encrypted sessions reside on the attached `/var/data` disk. Protect disk backups and the key separately. Avoid infrastructure logging that records OAuth callback query strings; the application does not log tokens or authorization codes.

## 3. Configure Google

1. In [Google Cloud Console](https://console.cloud.google.com/), select your project and enable **Google Sheets API**.
2. Open **Google Auth Platform → Audience**. For an External app in Testing, add your Google account as a test user.
3. Open **Clients → your Web application client**.
4. Under **Authorized redirect URIs**, add `https://YOUR-ACTUAL-HOST/api/google/callback`, replacing the host with your real Render address. This is a redirect URI, not a JavaScript origin. Keep the localhost callback if you still use the local app.
5. Save. If you later use a custom domain, update both APP_ORIGIN and this redirect URI.

## 4. Connect and verify

1. Open the hosted HTTPS address. The browser asks for the private app credentials: username **learner**, password **APP_ACCESS_PASSWORD**. This protects the learning files and the whole app. It is separate from Google sign-in. Browsers control password-prompt persistence; close the browser or clear its authentication state after using a shared computer.
2. Open **Google Sheets sync** in the sidebar, or visit `/sync`.
3. Click **Sign in with Google**, choose an account that can edit Final Tracker, and grant Sheets access.
4. Confirm **Connected securely**. Refresh, reopen the browser, and restart the Render service to check persistence. If the connection disappears after restart, check the disk directory, unchanged key, and hostname.
5. Save an intended task update in **Edit progress**. Select **Review changes**, inspect the proposed cells, then **Sync to Google Sheets**. Check the success message and corresponding Master Plan row. Refreshing and signing in never write automatically.

Connections last up to 30 days. Google can revoke them earlier; External apps in Testing with Sheets permission normally need reconnection after seven days. Disconnect removes the local session and attempts to revoke Google access.

## 5. Continue learning and deploy updates

- Practice locally in `learning/<category>/<task-id>/theory`, `notes`, `code`, `results`, and `resources`. Execute practice projects locally and record real results; the website displays code and links to separate apps rather than executing it.
- Commit and push the learning files you want online. Wait for GitHub checks, then select Render **Manual Deploy → Deploy latest commit**. Automatic deploys are disabled in the Blueprint.
- The online reader sees files on its own server. It cannot read unpushed files on your PC. Editing Render's checkout is temporary; redeploying can replace it. Keep learning content in Git. Only Google sessions use the persistent disk in this configuration.
- Browser progress belongs to its browser and origin. Moving from localhost to the hosted address does not transfer it. Export your old progress for your records and keep the old browser/origin until preserved. Backup import and two-way Sheets import are not implemented; Sheets sync only pushes reviewed changed fields.
- Back up the disk and keep the encryption key securely. Use one server instance; the file store and request queue do not support multiple workers.

## Troubleshooting

| Problem | Action |
| --- | --- |
| Site cannot load | Check Render build/deployment logs. Locally, build then run `npm run start -- --port 3100`. |
| Hosted startup fails | Set an exact HTTPS APP_ORIGIN, 20+ character APP_ACCESS_PASSWORD, and GOOGLE_SESSION_DIR on persistent disk. |
| Browser credential prompt | Enter `learner` and the private app password, not your Google password. |
| Setup incomplete | Read missing variable names on `/sync`, set them in Render Environment, restart. |
| `redirect_uri_mismatch` | Google's redirect URI must exactly match APP_ORIGIN plus `/api/google/callback`. |
| Google access denied | Check test-user membership, Sheets API, client secret, requested permission, and workbook edit access. |
| Reconnect after every deploy | Check persistent disk mount, GOOGLE_SESSION_DIR, stable key, and unchanged origin. |
| Seven-day disconnection | Often expected for Google apps in Testing. Reconnect; Google controls publishing/verification requirements. |
| Missing online notes | Commit, push, then redeploy. |
| Review expired or values changed | Review again; reviews expire after ten minutes and are rechecked before writing. |

References: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting), [Render disks](https://render.com/docs/disks), [Blueprint reference](https://render.com/docs/blueprint-spec), [Google OAuth](https://developers.google.com/identity/protocols/oauth2/web-server).
