import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StrainsPage() {
  const strains = await prisma.strain.findMany({ orderBy: { createdAt: "desc" } });
  
  const getTypeEmoji = (type) => {
    switch (type?.toLowerCase()) {
      case 'indica': return '🌙';
      case 'sativa': return '☀️';
      case 'hybrid': return '⚖️';
      default: return '🌿';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'indica': return 'bg-purple-900/30 border-purple-700/50 text-purple-300';
      case 'sativa': return 'bg-orange-900/30 border-orange-700/50 text-orange-300';
      case 'hybrid': return 'bg-green-900/30 border-green-700/50 text-green-300';
      default: return 'bg-neutral-900/30 border-neutral-700/50 text-neutral-300';
    }
  };

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="card hero-gradient glow text-center">
        <h1 className="text-4xl font-bold mb-4 weed-leaf">
          🌱 Cannabis Strain Database
        </h1>
        <p className="text-xl text-green-200 mb-2">
          Explore our comprehensive collection of cannabis strains
        </p>
        <p className="text-green-300">
          Educational information only — no cultivation instructions provided
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{strains.length}</div>
          <div className="text-green-300">Total Strains</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {strains.filter(s => s.type?.toLowerCase() === 'indica').length}
          </div>
          <div className="text-purple-300">Indica Strains</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-400 mb-2">
            {strains.filter(s => s.type?.toLowerCase() === 'sativa').length}
          </div>
          <div className="text-orange-300">Sativa Strains</div>
        </div>
      </div>

      {/* Strains Grid */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
          🧬 Available Strains
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strains.map(s => (
            <Link 
              key={s.id} 
              href={`/strains/${s.id}`} 
              className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-green-200 group-hover:text-green-100 transition-colors">
                  {s.name}
                </h3>
                <span className={`badge ${getTypeColor(s.type)}`}>
                  {getTypeEmoji(s.type)} {s.type || "Hybrid"}
                </span>
              </div>
              
              {s.summary && (
                <p className="text-green-300 text-sm line-clamp-3 mb-4">
                  {s.summary}
                </p>
              )}
              
              {/* THC/CBD Info */}
              {(s.thcMin || s.thcMax || s.cbdMin || s.cbdMax) && (
                <div className="flex gap-4 text-xs text-green-400">
                  {s.thcMin && s.thcMax && (
                    <span>THC: {s.thcMin}%-{s.thcMax}%</span>
                  )}
                  {s.cbdMin && s.cbdMax && (
                    <span>CBD: {s.cbdMin}%-{s.cbdMax}%</span>
                  )}
                </div>
              )}
              
              {/* Hover effect */}
              <div className="mt-3 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view details →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {strains.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-2xl font-semibold text-green-300 mb-4">
            No Strains Available
          </h3>
          <p className="text-green-200 mb-6">
            Check back later as we add more strains to our database.
          </p>
          <Link href="/" className="btn btn-primary">
            🏠 Return Home
          </Link>
        </div>
      )}
    </div>
  );
}