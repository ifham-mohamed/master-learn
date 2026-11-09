import type { Metadata } from "next";
import { InteractiveRoadmap } from "@/components/interactive-roadmap";
import "./roadmap.css";

export const metadata: Metadata = {
  title: "Learning roadmap",
  description: "Explore the warehouse curriculum by week or learning track.",
};

export default function RoadmapPage() {
  return <InteractiveRoadmap />;
}
