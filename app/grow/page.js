import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function GrowIndex() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="grid gap-8">
        <div className="card hero-gradient glow text-center">
          <h1 className="text-4xl font-bold mb-4 weed-leaf">
            📊 My Grow Logs
          </h1>
          <p className="text-xl text-green-200 mb-6">
            Track your growing journey with detailed logs and photos
          </p>
          <Link href="/login" className="btn btn-primary text-lg px-8 py-4">
            🔑 Sign In to Access
          </Link>
        </div>
      </div>
    );
  }
  
  const grows = await prisma.grow.findMany({
    where: { userId: session.user.id || undefined },
    orderBy: { createdAt: "desc" }
  });

  const getVisibilityEmoji = (visibility) => {
    switch (visibility) {
      case 'public': return '🌍';
      case 'private': return '🔒';
      case 'friends': return '👥';
      default: return '🔒';
    }
  };

  const getVisibilityColor = (visibility) => {
    switch (visibility) {
      case 'public': return 'text-green-400';
      case 'private': return 'text-red-400';
      case 'friends': return 'text-blue-400';
      default: return 'text-neutral-400';
    }
  };

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="card hero-gradient glow text-center">
        <h1 className="text-4xl font-bold mb-4 weed-leaf">
          📊 My Grow Logs
        </h1>
        <p className="text-xl text-green-200 mb-6">
          Track your growing journey with detailed logs and photos
        </p>
        <Link href="/grow/new" className="btn btn-primary text-lg px-8 py-4">
          ➕ Create New Log
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{grows.length}</div>
          <div className="text-green-300">Total Logs</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {grows.filter(g => g.visibility === 'private').length}
          </div>
          <div className="text-purple-300">Private Logs</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {grows.filter(g => g.visibility === 'public').length}
          </div>
          <div className="text-blue-300">Public Logs</div>
        </div>
      </div>

      {/* Grow Logs */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
          🌱 Your Growing Journey
        </h2>
        
        {grows.length === 0 ? (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-semibold text-green-300 mb-4">
              No Grow Logs Yet
            </h3>
            <p className="text-green-200 mb-6">
              Start your growing journey by creating your first log entry.
            </p>
            <Link href="/grow/new" className="btn btn-primary">
              ➕ Create Your First Log
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grows.map(g => (
              <Link 
                key={g.id} 
                href={`/grow/${g.id}`} 
                className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-green-200 group-hover:text-green-100 transition-colors">
                    {g.title}
                  </h3>
                  <span className={`text-sm ${getVisibilityColor(g.visibility)}`}>
                    {getVisibilityEmoji(g.visibility)} {g.visibility}
                  </span>
                </div>
                
                <div className="text-green-400 text-sm mb-3">
                  Created: {new Date(g.createdAt).toLocaleDateString()}
                </div>
                
                {/* Hover effect */}
                <div className="mt-3 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view details →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}