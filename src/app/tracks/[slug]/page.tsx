import { notFound } from "next/navigation";
import { categories, slug } from "@/lib/tracker";
import { Workspace } from "@/components/workspace";
export function generateStaticParams() {
  return categories.map((category) => ({ slug: slug(category) }));
}
export default async function TrackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: key } = await params;
  const category = categories.find((c) => slug(c) === key);
  if (!category) notFound();
  return <Workspace view="track" category={category} />;
}
