import Link from "next/link";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isComplete, slug, type Task } from "@/lib/tracker";
import { missingPrerequisites } from "@/lib/planner";
import {
  nextWarehouseTask,
  warehouseBrief,
  warehouseCheckpoints,
  warehouseLabs,
  warehousePhases,
  warehouseRequirements,
  warehouseTitle,
} from "@/lib/warehouse";
import { Status } from "./task-list";

export function WarehouseNext({ tasks }: { tasks: Task[] }) {
  const next = nextWarehouseTask(tasks);
  if (!next)
    return <p>All warehouse build checkpoints have recorded evidence.</p>;

  const prerequisites = missingPrerequisites(next, tasks);
  return (
    <>
      <Link href={`/tasks/${next.id}`}>
        <strong>
          {next.id} · {warehouseTitle(next)}
        </strong>
      </Link>
      <p>{next.nextAction || warehouseBrief(next.id)?.build}</p>
      {next.status === "Blocked" && <p>This task is marked blocked.</p>}
      {prerequisites.length > 0 && (
        <p>
          Complete first
          {prerequisites.map((id) => (
            <span key={id}>
              {" "}
              · <Link href={`/tasks/${id}`}>{id}</Link>
            </span>
          ))}
        </p>
      )}
    </>
  );
}

function SupportingTasks({
  title,
  ids,
  byId,
}: {
  title: string;
  ids: string[];
  byId: ReadonlyMap<string, Task>;
}) {
  if (!ids.length) return null;
  return (
    <div>
      <h4>{title}</h4>
      <ol className="warehouse-task-order">
        {ids.map((id) => {
          const task = byId.get(id)!;
          return (
            <li key={id}>
              <Link href={`/tasks/${id}`}>
                {id} · {warehouseTitle(task)}
              </Link>
              <span className="muted">
                {task.category}
                {task.scope === "Optional" && " · Optional"}
              </span>
              <Status value={task.status} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function WarehousePath({ tasks }: { tasks: Task[] }) {
  const byId = new Map(tasks.map((task) => [task.id, task]));
  const next = nextWarehouseTask(tasks);
  const currentCheckpoint = next && warehouseBrief(next.id)?.checkpoint;
  const completed = warehouseCheckpoints.filter(({ id }) =>
    isComplete(byId.get(id)!),
  ).length;
  useEffect(() => {
    function revealCheckpoint() {
      const target = document.getElementById(window.location.hash.slice(1));
      const details = target?.closest("details");
      if (details && !details.open) {
        details.open = true;
        target?.scrollIntoView();
      }
    }
    revealCheckpoint();
    window.addEventListener("hashchange", revealCheckpoint);
    return () => window.removeEventListener("hashchange", revealCheckpoint);
  }, []);
  return (
    <div className="warehouse-roadmap">
      <section
        className="panel tool-card warehouse-next"
        aria-labelledby="warehouse-next"
      >
        <div>
          <p className="context-label">
            {completed} of {warehouseCheckpoints.length} build checkpoints
            complete
          </p>
          <h2 id="warehouse-next">Next warehouse task</h2>
          <WarehouseNext tasks={tasks} />
        </div>
        <nav className="warehouse-actions" aria-label="Project sections">
          <a className="button secondary" href="#project-requirements">
            Requirements
          </a>
          <a className="button secondary" href="#build-roadmap">
            Build order
          </a>
          <a className="button secondary" href="#architecture-labs">
            Advanced labs
          </a>
        </nav>
      </section>

      <section className="panel tool-card" id="project-requirements">
        <h2>What you’re building</h2>
        <p className="warehouse-measure">
          One warehouse workflow in a Java terminal, then Spring Boot,
          PostgreSQL and React. Write and test your own implementation in{" "}
          <code>projects/warehouse-dispatch/</code>.
        </p>
        <dl className="warehouse-requirements">
          <div>
            <dt>Receive and create</dt>
            <dd>
              Receive positive SKU quantities once per receipt. Create a
              shipment for one warehouse without moving stock.
            </dd>
          </div>
          <div>
            <dt>Reserve and cancel</dt>
            <dd>
              Reserve all lines in one transaction. Available stock is on hand
              minus reserved. A failure changes no balances, and cancellation
              before pick releases stock once.
            </dd>
          </div>
          <div>
            <dt>Pick and dispatch</dt>
            <dd>
              Confirm the full pick before dispatch. Dispatch deducts on-hand
              and reserved quantities once and records the movement.
            </dd>
          </div>
          <div>
            <dt>Secure and operate</dt>
            <dd>
              Check role and warehouse ownership on the server. Record delivery
              and exceptions, prove safe retries, and rehearse recovery.
            </dd>
          </div>
        </dl>
        <details className="warehouse-spec">
          <summary>Detailed requirements and test scenarios</summary>
          <div className="learning-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {warehouseRequirements}
            </ReactMarkdown>
          </div>
        </details>
      </section>

      <section id="build-roadmap" aria-labelledby="build-roadmap-heading">
        <h2 id="build-roadmap-heading">Build order</h2>
        <p className="warehouse-measure">
          Open a checkpoint to see the preparation, the feature to finish, and
          the practice that follows. The linked tasks carry their own
          prerequisites and pass checks.
        </p>
        {warehousePhases.map((phase) => (
          <section
            key={phase.start}
            className="panel tool-card warehouse-phase"
          >
            <p className="context-label">
              Weeks {phase.start}–{phase.end}
            </p>
            <h3>{phase.title}</h3>
            <p className="warehouse-measure">{phase.outcome}</p>
            {warehouseCheckpoints
              .filter(({ week }) => week >= phase.start && week <= phase.end)
              .map(({ id, week, prepare, reflect }) => {
                const task = byId.get(id)!;
                const brief = warehouseBrief(id)!;
                return (
                  <details
                    className="warehouse-checkpoint"
                    key={id}
                    open={id === currentCheckpoint || undefined}
                  >
                    <summary>
                      <span>
                        Week {week} · {id}
                      </span>
                      <strong>{brief.title}</strong>
                      <Status value={task.status} />
                    </summary>
                    <div
                      className="warehouse-checkpoint-body"
                      id={`checkpoint-${id}`}
                    >
                      <SupportingTasks
                        title="Prepare and practice"
                        ids={prepare}
                        byId={byId}
                      />
                      <div className="warehouse-build">
                        <h4>
                          <Link href={`/tasks/${id}`}>
                            Build and verify {id}
                          </Link>
                        </h4>
                        <p>{brief.build}</p>
                        <p>
                          <strong>Pass check.</strong> {brief.verify}
                        </p>
                      </div>
                      <SupportingTasks
                        title="Reinforce and review"
                        ids={reflect}
                        byId={byId}
                      />
                    </div>
                  </details>
                );
              })}
          </section>
        ))}
      </section>

      <section id="architecture-labs" aria-labelledby="architecture-heading">
        <h2 id="architecture-heading">Advanced architecture labs</h2>
        <p className="warehouse-measure">
          Keep the stock rules in the working modular application. Start each
          extension after its checkpoint and record evidence under the related
          tasks. Labs are separate from the core completion count.
        </p>
        <div className="panel tool-card warehouse-phase">
          {warehouseLabs.map((lab) => (
            <details className="warehouse-checkpoint" key={lab.id}>
              <summary>
                <strong>{lab.title}</strong>
              </summary>
              <div
                className="warehouse-checkpoint-body warehouse-measure"
                id={lab.id}
              >
                <p>
                  Start after{" "}
                  <Link href={`/tasks/${lab.after}`}>
                    {lab.after} · {warehouseBrief(lab.after)?.title}
                  </Link>
                  .
                </p>
                <p>{lab.build}</p>
                <p>
                  <strong>Pass check.</strong> {lab.verify}
                </p>
                <ul className="warehouse-link-list">
                  {lab.tasks.map((id) => {
                    const task = byId.get(id)!;
                    return (
                      <li key={id}>
                        <Link href={`/tasks/${id}`}>{id}</Link> ·{" "}
                        <Link href={`/tracks/${slug(task.category)}`}>
                          {task.category}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {lab.references.length > 0 && (
                  <ul>
                    {lab.references.map((ref) => (
                      <li key={ref.url}>
                        <a href={ref.url}>{ref.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
