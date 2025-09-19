import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const body = await req.json();
  const data = {
    name: (body.name||"").toString().trim(),
    type: (body.type||"Hybrid").toString().trim(),
    summary: (body.summary||"").toString().trim().slice(0, 4000),
    lineage: (body.lineage||"").toString().trim().slice(0, 500),
    terpenes: (body.terpenes||"").toString().trim().slice(0, 500),
    tags: body.tags ? JSON.stringify(body.tags.split(',').map(tag => tag.trim()).filter(tag => tag)) : null,
    thcMin: body.thcMin ? Number(body.thcMin) : null,
    thcMax: body.thcMax ? Number(body.thcMax) : null,
    cbdMin: body.cbdMin ? Number(body.cbdMin) : null,
    cbdMax: body.cbdMax ? Number(body.cbdMax) : null
  };
  if (!data.name) return new Response(JSON.stringify({ error: "Name required" }), { status: 400 });
  await prisma.strain.create({ data });
  return new Response(JSON.stringify({ ok: true }), { status: 201 });
}