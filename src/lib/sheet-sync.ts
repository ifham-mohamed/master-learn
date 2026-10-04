import { tasks } from "./tracker";
import { validateProgress, type Progress } from "./progress";

export const spreadsheetId = "1dwXpxA_XDJofKmTJOv3Iq-uQteCnUlgl1zAs1noqnc4";
export const sheetFields = [
  ["status", "Status", "G", 6],
  ["evidence", "Evidence / result", "H", 7],
  ["nextAction", "Next action / blocker", "I", 8],
  ["actual", "Actual (h)", "M", 12],
  ["confidence", "Confidence 0-5", "N", 13],
  ["completedOn", "Completed on", "R", 17],
  ["technical", "Technical 0-5", "Z", 25],
  ["communication", "Communication 0-5", "AA", 26],
  ["mockResult", "Mock result", "AB", 27],
] as const;
export type SheetChange = {
  id: string;
  field: string;
  range: string;
  before: string | number;
  after: string | number;
  displayAfter: string | number;
  conflict: boolean;
};
export function sheetDate(value: string) {
  return value ? Date.parse(`${value}T00:00:00Z`) / 86400000 + 25569 : "";
}
export function planSheetChanges(
  rows: (string | number)[][],
  local: Record<string, Progress>,
): SheetChange[] {
  const header = rows.findIndex((row) => row[0] === "Task ID");
  if (
    header < 0 ||
    sheetFields.some(([, label, , index]) => rows[header][index] !== label)
  )
    throw new Error(
      "Master Plan columns changed. No updates were prepared; check the field mapping.",
    );
  const changes: SheetChange[] = [];
  for (const [id, progress] of Object.entries(local)) {
    const original = tasks.find((task) => task.id === id);
    if (!original || !validateProgress(progress))
      throw new Error(`Invalid local progress for ${id}.`);
    const positions = rows
      .map((row, index) => (row[0] === id ? index : -1))
      .filter((index) => index > header);
    if (positions.length !== 1)
      throw new Error(`Task ${id} must appear exactly once in Master Plan.`);
    const index = positions[0];
    for (const [key, field, column, offset] of sheetFields) {
      if (progress[key] === original[key]) continue;
      const after =
        key === "completedOn"
          ? sheetDate(progress[key] as string)
          : progress[key];
      const baseline =
        key === "completedOn"
          ? sheetDate(original[key] as string)
          : original[key];
      const before = rows[index][offset] ?? "";
      if (before === after) continue;
      if (typeof before === "string" && before.startsWith("="))
        throw new Error(
          `${id} ${field} contains a formula. It will not be overwritten.`,
        );
      changes.push({
        id,
        field,
        range: `'Master Plan'!${column}${index + 1}`,
        before,
        after,
        displayAfter: progress[key],
        conflict: before !== baseline,
      });
    }
  }
  return changes;
}

export async function sheetsRequest(
  token: string,
  suffix: string,
  body?: unknown,
) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/${suffix}`,
    {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    },
  );
  const data = await response.json();
  if (!response.ok)
    throw new Error(
      response.status === 401
        ? "Google sign-in expired. Reconnect and review again."
        : response.status === 403
          ? "Google denied access. Check the Sheets API, your account permissions, and OAuth setup."
          : "Google Sheets could not complete the request. Check the connection and review again.",
    );
  return data;
}
export async function readMasterPlan(
  token: string,
): Promise<(string | number)[][]> {
  const data = await sheetsRequest(
    token,
    `values/${encodeURIComponent("'Master Plan'!A:AE")}?valueRenderOption=FORMULA&dateTimeRenderOption=SERIAL_NUMBER`,
  );
  return data.values || [];
}
