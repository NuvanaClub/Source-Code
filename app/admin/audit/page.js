import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuditLogsUI from "./ui";

export default async function AdminAuditPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return <div className="card">Admins only.</div>;
  }

  return <AuditLogsUI />;
}
