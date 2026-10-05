import Link from "next/link";
export default function Page() {
  return (
    <section className="panel tool-card">
      <h1>This page is not downloaded</h1>
      <p>
        Reconnect to open this page. Your saved progress is still on this
        device. Previously downloaded tasks are available from the Master plan
        while offline.
      </p>
      <Link href="/today">Today</Link> · <Link href="/plan">Master plan</Link>
    </section>
  );
}
