import prisma from "@/lib/prisma";
import LegalGate from "@/components/LegalGate";
import CommentSection from "@/components/CommentSection";
import FavoriteButton from "@/components/FavoriteButton";

export async function generateMetadata({ params }) {
  const strain = await prisma.strain.findUnique({ 
    where: { id: params.id },
    select: {
      name: true,
      summary: true,
      type: true,
      thcMin: true,
      thcMax: true,
      tags: true
    }
  });

  if (!strain) {
    return {
      title: "Strain Not Found - Weed Wiki",
      description: "The requested cannabis strain could not be found."
    };
  }

  const title = `${strain.name} - ${strain.type || 'Hybrid'} Strain | Weed Wiki`;
  const description = strain.summary || `Learn about ${strain.name}, a ${strain.type?.toLowerCase() || 'hybrid'} cannabis strain. Educational information only.`;
  const ogImage = `/api/og?name=${encodeURIComponent(strain.name)}&type=${encodeURIComponent(strain.type || 'Hybrid')}&thc=${strain.thcMin ? `${strain.thcMin}-${strain.thcMax}` : 'Unknown'}`;

  return {
    title,
    description,
    keywords: strain.tags ? JSON.parse(strain.tags).join(', ') : `${strain.name}, ${strain.type}, cannabis strain, weed wiki`,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/strains/${params.id}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${strain.name} strain information`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function StrainDetail({ params }) {
  const strain = await prisma.strain.findUnique({ 
    where: { id: params.id },
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
  
  if (!strain) return <div className="card">Not found.</div>;

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
    <div className="grid gap-6">
      {/* Strain Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-green-200 mb-2">{strain.name}</h1>
            <div className="flex items-center gap-3">
              <span className={`badge ${getTypeColor(strain.type)}`}>
                {getTypeEmoji(strain.type)} {strain.type || "Hybrid"}
              </span>
              <span className="text-sm text-green-400">
                {strain._count.comments} comments • {strain._count.favorites} favorites
              </span>
            </div>
          </div>
          <FavoriteButton type="strain" strainId={strain.id} />
        </div>

        {strain.summary && (
          <p className="text-green-300 text-lg leading-relaxed mb-4">{strain.summary}</p>
        )}

        {/* Tags */}
        {strain.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {JSON.parse(strain.tags).map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-green-800/30 text-green-400 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Strain Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-300">Cannabinoid Profile</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-900/20 p-3 rounded-lg">
                <div className="text-sm text-green-400 mb-1">THC Content</div>
                <div className="text-xl font-semibold text-green-200">
                  {strain.thcMin ?? "?"}% – {strain.thcMax ?? "?"}%
                </div>
              </div>
              <div className="bg-green-900/20 p-3 rounded-lg">
                <div className="text-sm text-green-400 mb-1">CBD Content</div>
                <div className="text-xl font-semibold text-green-200">
                  {strain.cbdMin ?? "?"}% – {strain.cbdMax ?? "?"}%
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-300">Strain Information</h3>
            <div className="space-y-3">
              {strain.lineage && (
                <div>
                  <div className="text-sm text-green-400 mb-1">Lineage</div>
                  <div className="text-green-200">{strain.lineage}</div>
                </div>
              )}
              {strain.terpenes && (
                <div>
                  <div className="text-sm text-green-400 mb-1">Terpenes</div>
                  <div className="text-green-200">{strain.terpenes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Images Gallery */}
      {strain.images && strain.images.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-green-300 mb-4">Images</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {strain.images.map(image => (
              <div key={image.id} className="relative">
                <img 
                  src={image.url} 
                  alt={image.alt || strain.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {image.isPrimary && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <CommentSection strainId={strain.id} />

      {/* Legal Gate */}
      <LegalGate>
        <div className="card">
          <h2 className="text-lg font-medium text-green-300">Additional Information</h2>
          <p className="mt-2 text-green-200">
            This area is intentionally left neutral and free of step‑by‑step instructions. 
            If legal in your area, you can store your own notes here for personal reference.
          </p>
          <div className="mt-3 text-sm text-green-400">
            Admin may add high‑level, non‑instructional notes.
          </div>
        </div>
      </LegalGate>
    </div>
  );
}