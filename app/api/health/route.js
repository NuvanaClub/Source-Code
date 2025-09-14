import prisma from "@/lib/prisma";

export async function GET() {
  try {
    console.log("Health check started");
    
    // Test database connection
    await prisma.$connect();
    console.log("Database connected successfully");
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
    
    // Test if tables exist by trying to find a user
    const testUser = await prisma.user.findFirst();
    console.log("Test user query successful");
    
    return new Response(JSON.stringify({ 
      status: "healthy",
      database: "connected",
      userCount,
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return new Response(JSON.stringify({ 
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
