import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import { TrackerProvider } from "@/components/tracker-provider";
import "./globals.css";
import "./navigation.css";
import "./learning.css";
import "./theme.css";
export const metadata: Metadata = {
  title: {
    default: "Learnspace — Your engineering journey",
    template: "%s | Learnspace",
  },
  description:
    "A focused, evidence-based software engineering learning journey. Explore your 24-week plan, learning tracks, practice, and resources.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser extensions may add root attributes before hydration (for example
    // data-redeviation-bs-uid). Tolerate root-only differences; descendants
    // retain React's hydration checks.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('learnspace-theme');document.documentElement.dataset.theme=t==='dark'||t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}`,
          }}
        />
      </head>
      <body>
        <TrackerProvider>
          <Shell>{children}</Shell>
        </TrackerProvider>
      </body>
    </html>
  );
}
