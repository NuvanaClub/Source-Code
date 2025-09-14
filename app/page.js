import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Weed Wiki — Legal‑First</h1>
        <p className="mt-2 text-neutral-300">
          Neutral strain catalog and personal grow logs. This app does not provide cultivation instructions.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/strains" className="btn">Browse Strains</Link>
          <Link href="/grow" className="btn">My Grow Logs</Link>
          <Link href="/legal" className="btn">Legality & Disclaimer</Link>
        </div>
      </div>
    </div>
  );
}