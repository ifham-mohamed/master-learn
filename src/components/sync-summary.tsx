"use client";
import { useTracker } from "./tracker-provider";
export function SyncSummary() {
  const { localProgress, planner, study } = useTracker();
  const pending = Object.entries(localProgress).filter(
    ([id, value]) =>
      JSON.stringify(value) !== JSON.stringify(planner.synced[id]),
  ).length;
  return (
    <aside className="sync-summary">
      <strong>
        {pending} task records changed since the last verified sync
      </strong>
      <p>
        Last verified sync:{" "}
        {planner.syncedAt
          ? new Date(planner.syncedAt).toLocaleString("en-GB", {
              timeZone: "Asia/Colombo",
            })
          : "Not recorded on this device"}
        . Review fetches the exact cell differences and conflicts from Google;
        this local count is only an estimate.
      </p>
      {study.active && (
        <p>
          Pause or stop your task timer before reviewing: running time is not
          saved to Actual hours yet.
        </p>
      )}
      <p>
        Journals, revision history, schedule preferences and session details
        stay local. Export a backup to transfer them to another device.
      </p>
    </aside>
  );
}
