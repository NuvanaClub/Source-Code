import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    console.log("Registration attempt started");
    const body = await req.json();
    console.log("Registration body:", { email: body?.email, name: body?.name });
    
    const { email, password, name } = body || {};
    if (!email || !password) {
      console.log("Registration failed: Missing email or password");
      return new Response(JSON.stringify({ error: "Email and password required" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log("Checking for existing user...");
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log("Registration failed: User already exists");
      return new Response(JSON.stringify({ error: "User already exists" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.log("Hashing password...");
    const hash = await bcrypt.hash(password, 10);
    
    console.log("Creating user...");
    const user = await prisma.user.create({
      data: { email, password: hash, name }
    });
    
    console.log("User created successfully:", user.id);
    return new Response(JSON.stringify({ id: user.id }), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error("Registration error:", e);
    return new Response(JSON.stringify({ 
      error: "Failed to register",
      details: process.env.NODE_ENV === 'development' ? e.message : undefined
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}