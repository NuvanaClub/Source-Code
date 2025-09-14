import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StrainsPage() {
  const strains = await prisma.strain.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Strains</h1>
        <p className="text-sm text-neutral-400">Neutral catalog — no cultivation instructions.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {strains.map(s => (
          <Link key={s.id} href={`/strains/${s.id}`} className="card hover:bg-neutral-900/70">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">{s.name}</h2>
              <span className="badge">{s.type || "Hybrid"}</span>
            </div>
            {s.summary && <p className="mt-2 text-neutral-300 line-clamp-3">{s.summary}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}