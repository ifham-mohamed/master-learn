import type { LucideIcon } from "lucide-react";

export function ToolsHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="tools-heading">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function ToolHeading({
  icon: Icon,
  title,
  detail,
}: {
  icon: LucideIcon;
  title: string;
  detail?: string;
}) {
  return (
    <div className="tool-heading">
      <span className="tool-heading-icon">
        <Icon size={21} aria-hidden="true" />
      </span>
      <h2>{title}</h2>
      {detail && <span className="tool-heading-detail">{detail}</span>}
    </div>
  );
}
