"use client";

import Link from "next/link";
import { useState } from "react";

const logTemplate = [
  "## YYYY-MM-DD — Task ID",
  "",
  "### What I learned",
  "Explain one idea in your own words.",
  "",
  "### What I tried",
  "```java",
  "// Paste the snippet you ran.",
  "```",
  "",
  "### What happened",
  "```text",
  "Paste the actual terminal output here.",
  "```",
  "",
  "### Next step",
  "Write one thing to try or review.",
].join("\n");

export function ApplicationGuide() {
  const [message, setMessage] = useState("");
  return (
    <div className="handbook-quickstart">
      <section className="panel tool-card" aria-labelledby="start-learning">
        <h2 id="start-learning">One session, three steps</h2>
        <ol className="handbook-steps">
          <li><h3>Open your next task</h3><p>Use <Link href="/today">Today</Link> for the next task or <Link href="/roadmap">Roadmap</Link> to explore the sequence and tracks. Start with the <Link href="/tasks/JA05?file=README.md#learning-files">JA05 task guide</Link> for concepts, practice, and the workbook’s completion criteria.</p></li>
          <li><h3>Build and record what happened</h3><p>Write and run your own code. Edit <code>notes/journal.md</code> in the task folder. The workspace shows the path for the selected file. Add what you learned, what you tried, and your next step.</p></li>
          <li><h3>Publish your notes</h3><p>Commit and push the Markdown file. When GitHub Pages deploys the updated files, open <strong>Learning log</strong> on the task page to read it. Use <strong>Update progress</strong> separately when you have evidence.</p></li>
        </ol>
      </section>
      <section className="panel tool-card" aria-labelledby="log-example">
        <div className="section-heading">
          <h2 id="log-example">A short Markdown entry</h2>
          <button className="button secondary" type="button" onClick={async () => {
            try {
              await navigator.clipboard.writeText(logTemplate);
              setMessage("Template copied.");
            } catch {
              setMessage("Select the template text to copy it.");
            }
          }}>Copy template</button>
        </div>
        <p>Use the code language after the opening fence, such as <code>java</code> or <code>sql</code>. Use <code>text</code> for terminal output.</p>
        <pre className="handbook-template" tabIndex={0} aria-label="Markdown log template"><code>{logTemplate}</code></pre>
        {message && <p role="status">{message}</p>}
      </section>
      <p className="handbook-progress-link"><Link href="/settings">Settings & backups</Link> keeps your study schedule and progress backups in one place.</p>
      <p className="handbook-progress-link">
        <Link href="/weeks">Weekly plan</Link> · <Link href="/tracks">Learning tracks</Link> · <Link href="/practice">Practice bank</Link>
      </p>
    </div>
  );
}
