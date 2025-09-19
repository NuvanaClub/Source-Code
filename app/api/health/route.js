import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get basic stats
    const [userCount, strainCount, growCount] = await Promise.all([
      prisma.user.count(),
      prisma.strain.count(),
      prisma.grow.count()
    ]);
    
    return Response.json({
      status: 'healthy',
      database: 'connected',
      stats: {
        users: userCount,
        strains: strainCount,
        grows: growCount
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return Response.json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}