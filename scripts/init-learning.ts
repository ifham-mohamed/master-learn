import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  tasks,
  categories,
  sources,
  slug,
  trackDescriptions,
} from "../src/lib/tracker";
import additions from "../src/data/additional-resources.json";

const root = path.join(process.cwd(), "learning");
let created = 0;
async function create(relative: string, content: string) {
  const file = path.join(root, relative);
  await mkdir(path.dirname(file), { recursive: true });
  try {
    await writeFile(file, content, { encoding: "utf8", flag: "wx" });
    created++;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
  }
}
const prompts: Record<string, string> = {
  "Java & Spring":
    "Explain the Java or Spring concept, the object lifecycle, and one failure case. Record the JDK/framework versions you actually use.",
  "TypeScript & UI":
    "Explain the type or browser behavior, distinguish compile-time checks from runtime behavior, and record one accessible interaction.",
  "CS & SQL":
    "Define the system/data concept, show a small example, and test a boundary case such as NULL, duplicates, concurrency, or failure.",
  DSA: "State the invariant, derive time and space complexity, and trace the algorithm on an edge case. Record distinct problem IDs.",
  Engineering:
    "Explain the engineering decision, demonstrate the workflow, and record how you verified success and investigated failure.",
  "AI Engineering":
    "Record permitted AI use, your independent reasoning, generated suggestions you rejected, and checks that establish correctness.",
  "System design":
    "Capture requirements, assumptions, an architecture sketch, capacity estimates, trade-offs, and failure modes.",
  Projects:
    "Explain the user problem, your contribution, architecture decisions, implementation, test evidence, and trade-offs.",
  "Mock interviews":
    "Record the prompt, timebox, tool policy, approach, technical/communication feedback, result, and the next correction.",
  Review:
    "Reflect on what you demonstrated, what remains uncertain, workload changes, and the next review action.",
  Career:
    "Record the role or application context, relevant evidence, outreach/application actions, and next follow-up.",
};
async function main() {
  await create(
    "README.md",
    `# Your learning workspace\n\nEdit these files in your editor. Open the matching task in Learnspace to read them; the viewer checks for saved changes every five seconds while visible.\n\nStart with the worked example: [CS12 — JOINs](cs-and-sql/CS12/README.md).\n\n## Learning loop\n\n1. Read the task goal and sources.\n2. Explain the concept in theory/.\n3. Keep your own reasoning and mistakes in notes/.\n4. Write and run experiments in code/.\n5. Save actual output, screenshots, and conclusions in results/.\n6. Keep relevant links in resources/.\n7. Record progress separately in the task UI after demonstrating the outcome.\n\nTemplates are prompts, not completed lessons or evidence. File presence never marks a task complete. Code is displayed, not executed by Learnspace. Start web projects separately and link their URL in resources/links.md.\n\n## Categories\n\n${categories.map((c) => `- [${c}](${slug(c)}/README.md)`).join("\n")}\n`,
  );
  for (const category of categories) {
    await create(
      `${slug(category)}/README.md`,
      `# ${category}\n\n${trackDescriptions[category]}\n\n${prompts[category]}\n\n## Tasks\n\n${tasks
        .filter((t) => t.category === category)
        .map(
          (t) =>
            `- [${t.id} — ${t.title}](${t.id}/README.md) · week ${t.startWeek} · ${t.scope}`,
        )
        .join("\n")}\n`,
    );
  }
  for (const task of tasks) {
    const folder = `${slug(task.category)}/${task.id}`;
    const related = sources.filter((s) =>
      task.sourceIds.split(/\s+/).includes(s.relatedIds),
    );
    const extra = additions.filter((s) => s.taskIds.includes(task.id));
    await create(
      `${folder}/README.md`,
      `# ${task.id} — ${task.title}\n\n${task.category} · week ${task.startWeek}–${task.endWeek} · ${task.scope} · ${task.workType}\n\n[Open in Learnspace](http://127.0.0.1:3000/tasks/${task.id})\n\n## Task outcome\n\n${task.doneWhen}\n\n## Practice prompt\n\n${task.prompt || "Use the task outcome to design a small demonstration."}\n\n## Work here\n\n- [Theory](theory/concepts.md)\n- [Notes](notes/journal.md)\n- [Code](code/README.md)\n- [Results](results/evidence.md)\n- [Resources](resources/links.md)\n\nPrerequisites: ${task.prerequisites || "None specified"}.\nOriginal workbook: Master Plan row ${task.sourceRow}.\n\nThese are starter prompts, not completed learning. Save new files in the five section folders; supported files appear automatically in the UI.\n`,
    );
    await create(
      `${folder}/theory/concepts.md`,
      `# ${task.title} — theory\n\n> Starter template. Replace these prompts with your own explanation.\n\n## Learning goal\n\n${task.doneWhen}\n\n## Concepts to explain\n\n${prompts[task.category]}\n\n- What problem does this solve?\n- How does it work in your own words?\n- What assumptions does it rely on?\n\n## Small example\n\nAdd an example and explain each step. Link to a file in ../code/ when useful.\n\n## Edge cases and trade-offs\n\nRecord a counterexample, common mistake, and a trade-off.\n\n## Check your understanding\n\n${task.prompt || "Explain the outcome without looking at your notes, then demonstrate it."}\n\n## References\n\nSee [task resources](../resources/links.md).\n`,
    );
    await create(
      `${folder}/notes/journal.md`,
      `# ${task.id} learning journal\n\n> Starter template. Record your own session; no work is claimed here.\n\n## Session\n\n- Date:\n- Goal: ${task.title}\n- Time spent:\n- Tools / AI policy: ${task.aiMode || "Confirm the applicable policy."}\n\n## What I understood\n\nExplain the concept in your own words.\n\n## Attempts and mistakes\n\nWhat did you try? What failed, and why?\n\n## Next action\n\nWrite one concrete next step.\n`,
    );
    await create(
      `${folder}/code/README.md`,
      `# ${task.id} experiments\n\nPlace source files or a small project here. Nested folders are supported. Learnspace displays the source; run programs in your editor or terminal.\n\n## Deliverable\n\n${task.doneWhen}\n\n## Run instructions\n\nRecord prerequisites, exact versions, setup commands, and a repeatable command.\n\n## Checks\n\nDescribe a normal case, edge case, and failure case. Save real output in ../results/.\n\nFor a web project, record its separately running URL in [resources](../resources/links.md). Generated folders such as node_modules, .next, dist, build, and .venv are excluded from the viewer.\n`,
    );
    await create(
      `${folder}/results/evidence.md`,
      `# ${task.id} results and evidence\n\n> Starter template. No result has been recorded in this file.\n\n## What I ran or demonstrated\n\nCommand, environment, input, and date:\n\n## Expected result\n\nDescribe what would demonstrate the task outcome.\n\n## Actual result\n\nPaste actual output or add screenshots/logs next to this document. Link local files with Markdown.\n\n## Conclusion\n\nWhat passed? What remains unverified?\n\n## Task acceptance criteria\n\n${task.doneWhen}\n\n${task.workType === "Mock" ? "## Mock evaluation\n\n- Technical score (0–5):\n- Communication score (0–5):\n- Result:\n- One correction for the next mock:\n\n" : ""}## Related work\n\n[Theory](../theory/concepts.md) · [Notes](../notes/journal.md) · [Code](../code/README.md)\n`,
    );
    await create(
      `${folder}/resources/links.md`,
      `# ${task.id} resources\n\n## Original references\n\n${related.map((s) => `- [${s.relatedIds} — ${s.title}](${s.source})\n  - Original verification: ${s.verification}`).join("\n") || "No source IDs were recorded for this task."}\n\n## Additional official guides\n\n${extra.map((s) => `- [${s.title}](${s.url}) — ${s.description}`).join("\n") || "Add a relevant official reference as you learn."}\n\n## My references and running projects\n\nAdd a Markdown link with the project URL, why it is relevant, and the command/port needed to start it.\n\nHTTP availability and verification notes are separate; inherited claims are not newly verified by this template.\n`,
    );
  }
  console.log(
    `Created ${created} files for ${tasks.length} tasks in ${categories.length} categories. Existing files were not overwritten.`,
  );
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
