"use client";
import { SettingsView } from "@/components/planning-tools";
import { useTracker } from "@/components/tracker-provider";
export default function Page() {
  const { loaded } = useTracker();
  return loaded ? <SettingsView /> : <p>Loading your settings…</p>;
}
