import { SheetSync } from "@/components/sheet-sync";
import { BrowserSheetSync } from "@/components/browser-sheet-sync";
import { isGitHubPages } from "@/lib/deployment";
export const metadata = { title: "Google Sheets sync" };
export default function Page() {
  return isGitHubPages ? <BrowserSheetSync /> : <SheetSync />;
}
