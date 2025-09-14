import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  const body = await req.json();
  const grow = await prisma.grow.findUnique({ where: { id: params.id } });
  if (!grow || grow.userId !== session.user.id) return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  const entry = await prisma.growEntry.create({
    data: {
      growId: grow.id,
      note: (body?.note || "").toString().slice(0, 5000),
      photoPath: (body?.photoPath || "").toString()
    }
  });
  return new Response(JSON.stringify({ id: entry.id }), { status: 201 });
}