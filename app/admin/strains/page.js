import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminUI from "./ui";

export default async function AdminStrains() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return <div className="card">Admins only.</div>;
  }
  const strains = await prisma.strain.findMany({ 
    orderBy: { createdAt: "desc" },
    include: {
      images: true
    }
  });
  return <AdminUI strains={strains} />;
}