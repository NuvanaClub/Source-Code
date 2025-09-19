import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const strainId = searchParams.get("strainId");

    if (!strainId) {
      return NextResponse.json({ error: "Strain ID is required" }, { status: 400 });
    }

    // Delete the strain (this will cascade delete related images, comments, etc.)
    await prisma.strain.delete({
      where: { id: strainId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting strain:", error);
    return NextResponse.json({ error: "Failed to delete strain" }, { status: 500 });
  }
}
