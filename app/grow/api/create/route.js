import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ensureUserExists } from "@/lib/user-utils";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);
  console.log("Session user:", session?.user);
  
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (!session.user?.id) {
    console.log("ERROR: User ID not found in session");
    console.log("Session object:", JSON.stringify(session, null, 2));
    return new Response(JSON.stringify({ 
      error: "User ID not found in session",
      debug: {
        hasUser: !!session.user,
        userId: session.user?.id,
        userEmail: session.user?.email
      }
    }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const body = await req.json();
  const title = (body?.title || "").toString().trim();
  if (!title) {
    return new Response(JSON.stringify({ error: "Title required" }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Ensure user exists in database
    const user = await ensureUserExists(session.user);
    
    const g = await prisma.grow.create({
      data: { title, userId: user.id }
    });
    return new Response(JSON.stringify({ id: g.id }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ error: "Database error" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}