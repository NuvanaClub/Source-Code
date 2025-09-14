import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import GrowEditor from "./ui";

export default async function GrowDetail({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) return <div className="card">Please sign in.</div>;
  const grow = await prisma.grow.findUnique({
    where: { id: params.id },
    include: { entries: { orderBy: { createdAt: "desc" } } }
  });
  if (!grow || grow.userId !== session.user.id) return <div className="card">Not found.</div>;
  return <GrowEditor grow={grow} />;
}