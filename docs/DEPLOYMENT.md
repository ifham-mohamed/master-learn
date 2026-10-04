# Deploy with GitHub Pages only

The app now supports a static GitHub Pages build. No Render, hosting server, paid disk, or database is required. Google Sheets remains optional and connects directly from your browser to Google.

## What changes on Pages

- All task pages, dashboard, handbook, themes, and browser-saved progress work.
- Learning folders are converted into published JSON documents and downloadable files during the build. Edit locally, commit, and push to publish changes. Your PC files cannot update a remote static site until deployment finishes.
- Google Sheets uses browser authorization with the public client ID only. Tokens remain in memory and are cleared on reload; reconnect before reviewing and syncing. The encrypted 30-day server connection is available only in the local Node app. Client secrets and refresh tokens are never shipped to Pages.
- A Pages site has no application password. Treat published curriculum and learning files as public, even if the source repository is private. Review notes and results before publishing. Google authorization protects your spreadsheet, not the published website.
- Progress is saved in the browser, not in GitHub. Changing origins (localhost to github.io) does not migrate progress. Export existing progress for your records; backup import and two-way Sheets import are not implemented.

## 1. Push the code

From `C:\projects\swe-learn`, inspect and push the prepared commits:

```powershell
git status
git push origin main
```

Repository: `ifham-mohamed/master-learn`. Never commit `.env.local`, `.local/`, tokens, or secrets. The Pages build uses an isolated copy of approved build inputs and publishes only `out/`, not the project directory.

## 2. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**. Do not select a branch or Jekyll theme.
4. If using GitHub Free, Pages is available for public repositories. Private-repository availability depends on your GitHub plan. Making a repository public also exposes its tracked files and history, so review them first.

## 3. Configure optional Google sign-in

1. Go to **Settings → Secrets and variables → Actions → Variables**.
2. Add a **repository variable** named `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
3. Set its value to your existing Google Web application client ID ending in `.apps.googleusercontent.com`. This identifier is public. Do not add the client secret, session key, or app password.
4. In Google Cloud Console, enable **Google Sheets API** for that client's project.
5. Open **Google Auth Platform → Clients → your Web application client**.
6. Under **Authorized JavaScript origins**, add exactly:

```text
https://ifham-mohamed.github.io
```

Do not include `/master-learn`, `/sync`, or a trailing slash. Pages uses a popup token flow and needs no `/api/google/callback` redirect. Keep the localhost callback if you still use the secure local server.

7. Under **Audience**, add your Google account as a test user if the app is External and in Testing. Use an account that can edit Final Tracker.
8. Save. Google settings can take time to propagate. If testing the static preview locally, also register `http://localhost:3200` as a JavaScript origin.

## 4. Run deployment

1. Open GitHub **Actions → Deploy GitHub Pages**.
2. Select **Run workflow**, branch `main`, then **Run workflow**. This is useful if the first push ran before Pages or the variable was configured.
3. Wait for the build and deploy jobs to finish successfully. The workflow tests the application, builds every page and learning snapshot, checks static links/assets, and uploads only the export.
4. Open the URL displayed by the deployment. With the current repository name it should be:

```text
https://ifham-mohamed.github.io/master-learn/
```

The Google sync page is `https://ifham-mohamed.github.io/master-learn/sync/`.

5. Verify a task such as `/master-learn/tasks/CS12/`, its Theory/Code/Results tabs, a direct refresh on that route, theme switching, and local progress saving.
6. Open Google Sheets sync, select **Sign in with Google**, grant Sheets access, and then **Review changes**. Only click **Sync to Google Sheets** after checking the cells. Sign-in and refresh never write automatically.

## 5. Publish subsequent learning

Edit files under `learning/<category>/<task-id>/theory`, `notes`, `code`, `results`, and `resources`. Run practice code on your computer and save actual outputs in results. Commit and push the specific files you want online:

```powershell
git add learning/cs-and-sql/CS12
git commit -m "docs: record SQL JOIN practice"
git push origin main
```

Each push to `main` triggers the Pages workflow. Wait for success and refresh the site. Files above 20 MB are omitted with a workspace warning; text previews above 1 MB offer a download. HTML is shown in a script-disabled frame; raw HTML downloads are published as text so opening them cannot execute scripts on your Pages origin. Generated/hidden files and symlinks are excluded from learning snapshots.

## Local Pages preview

```powershell
npm run build:pages
npm run check:pages
npm run preview:pages
```

Open `http://localhost:3200/master-learn/`. This preview serves only static files, just like Pages. It runs separately from the local Node version on port 3100; stop the preview with Ctrl+C when started in your terminal.

For Google sign-in in this preview, set the public identifier before building:

```powershell
$env:NEXT_PUBLIC_GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com"
npm run build:pages
```

The Pages build deliberately does not read `.env.local`. Never export server-only credentials. The default base path is `/master-learn`; set `PAGES_BASE_PATH` to an empty string for a root/custom-domain site, or to `/new-repository-name` if renamed. GitHub's workflow obtains the correct path from Pages configuration automatically.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Deploy job says Pages not configured | Set Settings → Pages → Source to GitHub Actions, then rerun. |
| Google button unavailable | Set NEXT_PUBLIC_GOOGLE_CLIENT_ID as an Actions repository variable and rerun deployment. |
| Google origin error | Register `https://ifham-mohamed.github.io` as an Authorized JavaScript origin, without repository path. |
| Google popup denied | Check test-user membership, Sheets API, account edit access, and popup/browser settings. |
| Reconnect after refresh | Expected on Pages. There is no backend to retain or renew a private Google session. |
| Missing new notes | Check that files were committed and pushed and the latest deployment succeeded. |
| Local progress missing | Different origins/browsers have different storage; your old progress remains at the old origin. |
| 404 or broken styling | Use the workflow-generated URL and base path. Upload only the built out artifact, never src or .next. |
| Build fails | Open the failed job in Actions and read its error. No hosting-service setup is needed. |

References: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Next.js static export](https://nextjs.org/docs/app/guides/static-exports), [Google browser token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model).
