import Link from "next/link";
import { isComplete, type Task } from "@/lib/tracker";
import { missingPrerequisites } from "@/lib/planner";
import {
  nextWarehouseTask,
  warehouseBrief,
  warehousePhases,
} from "@/lib/warehouse";

export function WarehouseNext({ tasks }: { tasks: Task[] }) {
  const next = nextWarehouseTask(tasks);
  if (!next)
    return <p>All warehouse build checkpoints have recorded evidence.</p>;

  const prerequisites = missingPrerequisites(next, tasks);
  return (
    <>
      <Link href={`/tasks/${next.id}`}>
        <strong>
          {next.id} · {next.title}
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

export function WarehousePath({ tasks }: { tasks: Task[] }) {
  const checkpoints = tasks.filter((task) => /^B\d{2}$/.test(task.id));
  return (
    <section className="panel tool-card" aria-labelledby="warehouse-next">
      <h2 id="warehouse-next">Next warehouse task</h2>
      <WarehouseNext tasks={tasks} />
      <p>
        <strong>
          {checkpoints.filter(isComplete).length} of {checkpoints.length}
        </strong>{" "}
        build checkpoints complete
      </p>
      <details>
        <summary>Warehouse workflow and stock rules</summary>
        <p>
          Receive stock, create a shipment, reserve all its lines, confirm the
          pick, then dispatch. Record delivery and exceptions once the dispatch
          workflow works.
        </p>
        <p>
          Available stock is on hand minus reserved. Cancelling before pick
          releases the reservation once. Dispatch deducts picked stock once. A
          failed reservation leaves all balances unchanged.
        </p>
        <p>
          Use Spring Boot, PostgreSQL and React. Keep your source and tests
          under <code>projects/warehouse-dispatch/</code>, where the project
          README lists the business rules and examples.
        </p>
      </details>
      <ol className="warehouse-phases">
        {warehousePhases.map((phase) => {
          const items = checkpoints.filter(
            (task) =>
              task.startWeek >= phase.start && task.startWeek <= phase.end,
          );
          return (
            <li key={phase.start}>
              <details>
                <summary>
                  <strong>{phase.title}</strong> ·{" "}
                  {items.filter(isComplete).length}/{items.length}
                </summary>
                <p>{phase.outcome}</p>
                <ul>
                  {items.map((task) => (
                    <li key={task.id}>
                      <Link href={`/tasks/${task.id}`}>
                        {task.id} · {warehouseBrief(task.id)?.build}
                      </Link>
                      {isComplete(task) && <span> · Complete</span>}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
