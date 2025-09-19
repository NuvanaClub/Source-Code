"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function FavoriteButton({ type, strainId, growId, className = "" }) {
  const { data: session } = useSession();
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      checkFavoriteStatus();
    }
  }, [session, strainId, growId]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch("/api/favorites");
      const favorites = await response.json();
      const isFav = favorites.some(fav => 
        fav.type === type && 
        ((type === "strain" && fav.strainId === strainId) || 
         (type === "grow" && fav.growId === growId))
      );
      setIsFavorited(isFav);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      if (isFavorited) {
        await fetch("/api/favorites", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, strainId, growId })
        });
        setIsFavorited(false);
      } else {
        await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, strainId, growId })
        });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isFavorited
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-green-900/30 hover:bg-green-800/50 text-green-300 border border-green-700/50"
      } ${className}`}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : isFavorited ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  );
}
