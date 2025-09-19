import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { isPublic } = body;

    // Check if grow exists and belongs to user
    const grow = await prisma.grow.findUnique({
      where: { id: params.id }
    });

    if (!grow || grow.userId !== session.user.id) {
      return NextResponse.json({ error: "Grow log not found" }, { status: 404 });
    }

    // Update the public status
    const updatedGrow = await prisma.grow.update({
      where: { id: params.id },
      data: { isPublic: Boolean(isPublic) }
    });

    return NextResponse.json({ 
      success: true, 
      isPublic: updatedGrow.isPublic 
    });
  } catch (error) {
    console.error("Toggle public status error:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
