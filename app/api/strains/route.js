import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const strains = await prisma.strain.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        images: true,
        _count: {
          select: {
            comments: true,
            favorites: true
          }
        }
      }
    });

    return NextResponse.json(strains);
  } catch (error) {
    console.error("Error fetching strains:", error);
    return NextResponse.json(
      { error: "Failed to fetch strains" },
      { status: 500 }
    );
  }
}
