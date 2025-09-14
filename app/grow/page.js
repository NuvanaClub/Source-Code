import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function GrowIndex() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <div className="card">Please <a className="link" href="/login">sign in</a> to view your logs.</div>;
  }
  const grows = await prisma.grow.findMany({
    where: { userId: session.user.id || undefined },
    orderBy: { createdAt: "desc" }
  });
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Grow Logs</h1>
        <Link href="/grow/new" className="btn">New Log</Link>
      </div>
      {grows.length === 0 && <div className="card">No logs yet.</div>}
      <div className="grid md:grid-cols-2 gap-4">
        {grows.map(g => (
          <Link key={g.id} href={`/grow/${g.id}`} className="card hover:bg-neutral-900/70">
            <h2 className="text-lg font-medium">{g.title}</h2>
            <div className="text-sm text-neutral-400 mt-1">Visibility: {g.visibility}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}