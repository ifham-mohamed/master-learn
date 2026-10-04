import { notFound } from "next/navigation";
import { tasks } from "@/lib/tracker";
import { TaskDetail } from "@/components/task-detail";
export function generateStaticParams() {
  return tasks.map((t) => ({ id: t.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: tasks.find((t) => t.id === id)?.title || "Task not found" };
}
export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!tasks.some((t) => t.id === id)) notFound();
  return <TaskDetail id={id} />;
}
