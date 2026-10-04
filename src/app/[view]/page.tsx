import { notFound } from "next/navigation";
import { Workspace } from "@/components/workspace";
const views = [
  "weeks",
  "plan",
  "tracks",
  "practice",
  "projects",
  "resources",
  "guide",
];
export function generateStaticParams() {
  return views.map((view) => ({ view }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  return {
    title:
      (
        {
          weeks: "Weekly journey",
          plan: "Master plan",
          tracks: "Learning tracks",
          practice: "Practice bank",
          projects: "Projects",
          resources: "Resource library",
          guide: "Plan & guidance",
        } as Record<string, string>
      )[view] || "Not found",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!views.includes(view)) notFound();
  return <Workspace view={view} />;
}
