import Link from "next/link";
export default function NotFound() {
  return (
    <div className="empty-state">
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>This page isn’t in your plan.</h1>
      <p>Head back to your workspace to find your next step.</p>
      <Link className="button primary" href="/">
        Back to overview
      </Link>
    </div>
  );
}
