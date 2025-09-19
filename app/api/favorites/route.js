import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ensureUserExists } from "@/lib/user-utils";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Ensure user exists in database
    const user = await ensureUserExists(session.user);
    
    const favorites = await prisma.userFavorite.findMany({
      where: { userId: user.id },
      include: {
        strain: true,
        grow: {
          include: {
            strain: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // Ensure user exists in database
    const user = await ensureUserExists(session.user);
    
    const { type, strainId, growId } = await req.json();

    if (!type || (type === "strain" && !strainId) || (type === "grow" && !growId)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Check if already favorited
    const existing = await prisma.userFavorite.findFirst({
      where: {
        userId: user.id,
        type,
        strainId: type === "strain" ? strainId : null,
        growId: type === "grow" ? growId : null
      }
    });

    if (existing) {
      return NextResponse.json({ error: "Already favorited" }, { status: 400 });
    }

    const favorite = await prisma.userFavorite.create({
      data: {
        userId: user.id,
        type,
        strainId: type === "strain" ? strainId : null,
        growId: type === "grow" ? growId : null
      }
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error("Error creating favorite:", error);
    return NextResponse.json({ error: "Failed to create favorite" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { type, strainId, growId } = await req.json();

    if (!type || (type === "strain" && !strainId) || (type === "grow" && !growId)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const favorite = await prisma.userFavorite.findFirst({
      where: {
        userId: session.user.id,
        type,
        strainId: type === "strain" ? strainId : null,
        growId: type === "grow" ? growId : null
      }
    });

    if (!favorite) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.userFavorite.delete({
      where: { id: favorite.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 });
  }
}
