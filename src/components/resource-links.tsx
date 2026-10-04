import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { sources } from "@/lib/tracker";
import additions from "@/data/additional-resources.json";

export function ResourceLinks({
  ids,
  taskId,
}: {
  ids: string;
  taskId?: string;
}) {
  const entries = sources.filter((s) =>
    ids.split(/\s+/).includes(s.relatedIds),
  );
  const guides = additions.filter((s) => taskId && s.taskIds.includes(taskId));
  if (!entries.length && !guides.length) return null;
  return (
    <div className="resource-links">
      {entries.length > 0 && (
        <>
          <h4>Original references</h4>
          {entries.map((s) => (
            <Link key={s.relatedIds} href={`/resources#${s.relatedIds}`}>
              <BookOpen size={14} />
              {s.relatedIds} · {s.title}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </>
      )}
      {guides.length > 0 && (
        <>
          <h4 className="added-guides">Suggested official learning guides</h4>
          {guides.map((s) => (
            <Link key={s.id} href={`/resources#${s.id}`}>
              <BookOpen size={14} />
              {s.title}
              <ArrowUpRight size={13} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
