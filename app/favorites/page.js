"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchFavorites();
    }
  }, [status]);

  const fetchFavorites = async () => {
    try {
      const response = await fetch("/api/favorites");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (type, strainId, growId) => {
    setFavorites(prev => 
      prev.filter(fav => 
        !(fav.type === type && 
          ((type === "strain" && fav.strainId === strainId) || 
           (type === "grow" && fav.growId === growId)))
      )
    );
  };

  if (status === "loading" || loading) {
    return (
      <div className="grid gap-8">
        <div className="card hero-gradient glow text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-green-800/30 rounded mb-4"></div>
            <div className="h-4 bg-green-800/30 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="grid gap-8">
        <div className="card hero-gradient glow text-center">
          <h1 className="text-4xl font-bold mb-4 weed-leaf">
            ❤️ My Favorites
          </h1>
          <p className="text-xl text-green-200 mb-6">
            Please sign in to view your favorites
          </p>
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const strainFavorites = favorites.filter(fav => fav.type === "strain");
  const growFavorites = favorites.filter(fav => fav.type === "grow");

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
          ❤️ My Favorites
        </h1>
        <p className="text-xl text-green-200 mb-2">
          Your saved strains and grow logs
        </p>
        <p className="text-green-300">
          {favorites.length} total favorites
        </p>
      </div>

      {/* Strain Favorites */}
      {strainFavorites.length > 0 && (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
            🌱 Favorite Strains ({strainFavorites.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strainFavorites.map(favorite => {
              const strain = favorite.strain;
              if (!strain) return null;
              
              return (
                <div key={favorite.id} className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <Link href={`/strains/${strain.id}`} className="flex-1">
                      <h3 className="text-xl font-semibold text-green-200 group-hover:text-green-100 transition-colors">
                        {strain.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${getTypeColor(strain.type)}`}>
                        {getTypeEmoji(strain.type)} {strain.type || "Hybrid"}
                      </span>
                      <FavoriteButton 
                        type="strain" 
                        strainId={strain.id}
                        onToggle={() => handleRemoveFavorite("strain", strain.id, null)}
                      />
                    </div>
                  </div>
                  
                  {strain.summary && (
                    <p className="text-green-300 text-sm line-clamp-3 mb-4">
                      {strain.summary}
                    </p>
                  )}

                  {/* Tags */}
                  {strain.tags && (() => {
                    let strainTags = [];
                    try {
                      strainTags = JSON.parse(strain.tags);
                    } catch {
                      strainTags = strain.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                    }
                    return (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {strainTags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-green-800/30 text-green-400 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {strainTags.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-green-800/30 text-green-400 rounded-full">
                            +{strainTags.length - 3}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                  
                  {/* THC/CBD Info */}
                  {(strain.thcMin || strain.thcMax || strain.cbdMin || strain.cbdMax) && (
                    <div className="flex gap-4 text-xs text-green-400">
                      {strain.thcMin && strain.thcMax && (
                        <span>THC: {strain.thcMin}%-{strain.thcMax}%</span>
                      )}
                      {strain.cbdMin && strain.cbdMax && (
                        <span>CBD: {strain.cbdMin}%-{strain.cbdMax}%</span>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-3 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/strains/${strain.id}`} className="hover:underline">
                      View details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grow Favorites */}
      {growFavorites.length > 0 && (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
            📊 Favorite Grow Logs ({growFavorites.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growFavorites.map(favorite => {
              const grow = favorite.grow;
              if (!grow) return null;
              
              return (
                <div key={favorite.id} className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-3">
                    <Link href={`/grow/${grow.id}`} className="flex-1">
                      <h3 className="text-xl font-semibold text-green-200 group-hover:text-green-100 transition-colors">
                        {grow.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="badge bg-blue-900/30 border-blue-700/50 text-blue-300">
                        {grow.visibility}
                      </span>
                      <FavoriteButton 
                        type="grow" 
                        growId={grow.id}
                        onToggle={() => handleRemoveFavorite("grow", null, grow.id)}
                      />
                    </div>
                  </div>
                  
                  {grow.strain && (
                    <p className="text-green-300 text-sm mb-2">
                      Strain: {grow.strain.name}
                    </p>
                  )}
                  
                  <p className="text-green-400 text-sm">
                    {grow.entries?.length || 0} entries • Created {new Date(grow.createdAt).toLocaleDateString()}
                  </p>
                  
                  <div className="mt-3 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/grow/${grow.id}`} className="hover:underline">
                      View grow log →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <h3 className="text-2xl font-semibold text-green-300 mb-4">
            No Favorites Yet
          </h3>
          <p className="text-green-200 mb-6">
            Start exploring strains and grow logs to add them to your favorites.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/strains" className="btn btn-primary">
              🌱 Browse Strains
            </Link>
            <Link href="/grow" className="btn">
              📊 My Grow Logs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
