import prisma from "@/lib/prisma";
import LegalGate from "@/components/LegalGate";

export default async function StrainDetail({ params }) {
  const strain = await prisma.strain.findUnique({ where: { id: params.id } });
  if (!strain) return <div className="card">Not found.</div>;
  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{strain.name}</h1>
          <span className="badge">{strain.type || "Hybrid"}</span>
        </div>
        {strain.summary && <p className="mt-2 text-neutral-300">{strain.summary}</p>}
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-neutral-300">
          {strain.lineage && <div><span className="label">Lineage</span><div>{strain.lineage}</div></div>}
          <div><span className="label">THC</span><div>{strain.thcMin ?? "?"}% – {strain.thcMax ?? "?"}%</div></div>
          <div><span className="label">CBD</span><div>{strain.cbdMin ?? "?"}% – {strain.cbdMax ?? "?"}%</div></div>
          {strain.terpenes && <div className="col-span-2"><span className="label">Terpenes</span><div>{strain.terpenes}</div></div>}
        </div>
      </div>
      <LegalGate>
        <div className="card">
          <h2 className="text-lg font-medium">Sensitive Section</h2>
          <p className="mt-1 text-neutral-300">This area is intentionally left neutral and free of step‑by‑step instructions. If legal in your area, you can store your own notes here for personal reference.</p>
          <div className="mt-2 text-sm text-neutral-400">Admin may add high‑level, non‑instructional notes.</div>
        </div>
      </LegalGate>
    </div>
  );
}