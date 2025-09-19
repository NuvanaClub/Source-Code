import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const strainId = searchParams.get("strainId");

  if (!strainId) {
    return NextResponse.json({ error: "Strain ID required" }, { status: 400 });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { strainId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: "asc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { strainId, content, parentId } = await req.json();

    if (!strainId || !content) {
      return NextResponse.json({ error: "Strain ID and content required" }, { status: 400 });
    }

    // Check if strain exists
    const strain = await prisma.strain.findUnique({
      where: { id: strainId }
    });

    if (!strain) {
      return NextResponse.json({ error: "Strain not found" }, { status: 404 });
    }

    let comment;

    if (parentId) {
      // Create a reply
      comment = await prisma.commentReply.create({
        data: {
          userId: session.user.id,
          commentId: parentId,
          content: content.slice(0, 1000)
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
    } else {
      // Create a new comment
      comment = await prisma.comment.create({
        data: {
          userId: session.user.id,
          strainId,
          content: content.slice(0, 1000)
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            },
            orderBy: { createdAt: "asc" }
          }
        }
      });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("commentId");
    const replyId = searchParams.get("replyId");

    if (!commentId && !replyId) {
      return NextResponse.json({ error: "Comment or reply ID required" }, { status: 400 });
    }

    if (replyId) {
      // Delete a reply
      const reply = await prisma.commentReply.findUnique({
        where: { id: replyId },
        include: { comment: true }
      });

      if (!reply) {
        return NextResponse.json({ error: "Reply not found" }, { status: 404 });
      }

      if (reply.userId !== session.user.id && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      await prisma.commentReply.delete({
        where: { id: replyId }
      });
    } else {
      // Delete a comment
      const comment = await prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        return NextResponse.json({ error: "Comment not found" }, { status: 404 });
      }

      if (comment.userId !== session.user.id && session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Delete comment and all replies
      await prisma.comment.delete({
        where: { id: commentId }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
  }
}
