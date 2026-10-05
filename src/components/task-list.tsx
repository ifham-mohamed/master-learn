import Link from "next/link";
import { ArrowUpRight, Check, Circle, Clock3 } from "lucide-react";
import { formatDate, type Task } from "@/lib/tracker";

export function Status({ value }: { value: string }) {
  return (
    <span
      className={`status ${value === "Done" ? "done" : value === "In progress" ? "progress" : value === "Blocked" ? "blocked" : ""}`}
    >
      <span />
      {value}
    </span>
  );
}
export function TaskList({
  items,
  compact = false,
}: {
  items: Task[];
  compact?: boolean;
}) {
  if (!items.length)
    return (
      <div className="empty-state">
        <Circle size={28} />
        <h3>No tasks match these filters</h3>
        <p>Try another search, week, or learning track.</p>
      </div>
    );
  return (
    <div className={`task-list ${compact ? "compact" : ""}`}>
      {items.map((task) => (
        <Link href={`/tasks/${task.id}`} key={task.id} className="task-row">
          <span
            className={`task-marker ${task.status === "Done" ? "checked" : ""}`}
          >
            {task.status === "Done" ? (
              <Check size={13} />
            ) : task.status === "In progress" ? (
              <span />
            ) : null}
          </span>
          <span className="task-main">
            <span className="task-title">{task.title}</span>
            <span className="task-meta">
              <span>{task.category}</span>
              <span>·</span>
              <span>{task.id}</span>
              <span>· Due {formatDate(task.dueDate)}</span>
              {!compact && (
                <>
                  <span>·</span>
                  <span>
                    Week {task.startWeek}
                    {task.endWeek !== task.startWeek ? `–${task.endWeek}` : ""}
                  </span>
                </>
              )}
            </span>
          </span>
          <span className="task-time">
            <Clock3 size={13} />
            {task.estimate}h
          </span>
          <Status value={task.status} />
          <ArrowUpRight size={16} className="task-arrow" />
        </Link>
      ))}
    </div>
  );
}
