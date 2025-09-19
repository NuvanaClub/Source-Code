"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function StrainsPage() {
  const [strains, setStrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);
  const [thcRange, setThcRange] = useState([0, 50]);
  const [cbdRange, setCbdRange] = useState([0, 20]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const searchParams = useSearchParams();

  const strainsPerPage = 12;

  // Available tags for filtering
  const availableTags = [
    "earthy", "pine", "citrus", "fruity", "sweet", "grape", "berry",
    "relaxing", "energizing", "uplifting", "balanced", "versatile",
    "indica", "sativa", "hybrid", "bright", "smooth", "tropical"
  ];

  // Fetch strains
  useEffect(() => {
    const fetchStrains = async () => {
      try {
        const response = await fetch("/api/strains");
        const data = await response.json();
        setStrains(data);
      } catch (error) {
        console.error("Error fetching strains:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStrains();
  }, []);

  // Filter and sort strains
  const filteredAndSortedStrains = useMemo(() => {
    let filtered = strains.filter(strain => {
      // Search term filter
      if (searchTerm && !strain.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !strain.summary?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !strain.terpenes?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type filter
      if (selectedType !== "all" && strain.type?.toLowerCase() !== selectedType) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0) {
        const strainTags = strain.tags ? JSON.parse(strain.tags) : [];
        const hasMatchingTag = selectedTags.some(tag => 
          strainTags.some(strainTag => strainTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasMatchingTag) return false;
      }

      // THC range filter
      if (strain.thcMin !== null && strain.thcMax !== null) {
        const thcMin = strain.thcMin;
        const thcMax = strain.thcMax;
        if (thcMin < thcRange[0] || thcMax > thcRange[1]) {
          return false;
        }
      }

      // CBD range filter
      if (strain.cbdMin !== null && strain.cbdMax !== null) {
        const cbdMin = strain.cbdMin;
        const cbdMax = strain.cbdMax;
        if (cbdMin < cbdRange[0] || cbdMax > cbdRange[1]) {
          return false;
        }
      }

      return true;
    });

    // Sort strains
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "thc":
          aValue = a.thcMax || 0;
          bValue = b.thcMax || 0;
          break;
        case "cbd":
          aValue = a.cbdMax || 0;
          bValue = b.cbdMax || 0;
          break;
        case "created":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [strains, searchTerm, selectedType, selectedTags, thcRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedStrains.length / strainsPerPage);
  const startIndex = (currentPage - 1) * strainsPerPage;
  const paginatedStrains = filteredAndSortedStrains.slice(startIndex, startIndex + strainsPerPage);

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

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedTags([]);
    setThcRange([0, 50]);
    setCbdRange([0, 20]);
    setSortBy("name");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="grid gap-8">
        <div className="card hero-gradient glow text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-green-800/30 rounded mb-4"></div>
            <div className="h-4 bg-green-800/30 rounded mb-2"></div>
            <div className="h-4 bg-green-800/30 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-6 bg-green-800/30 rounded mb-2"></div>
              <div className="h-4 bg-green-800/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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

      {/* Search and Filters */}
      <div className="card">
        <div className="grid gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search strains by name, description, or terpenes..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="input w-full pl-10"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filters Row */}
          <div className="grid md:grid-cols-5 gap-4">
            {/* Type Filter */}
            <div>
              <label className="label block mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setCurrentPage(1);
                }}
                className="input"
              >
                <option value="all">All Types</option>
                <option value="indica">Indica</option>
                <option value="sativa">Sativa</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="label block mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="input"
              >
                <option value="name">Name</option>
                <option value="thc">THC Content</option>
                <option value="cbd">CBD Content</option>
                <option value="created">Date Added</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="label block mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                className="input"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* THC Range */}
            <div>
              <label className="label block mb-2">
                THC Range: {thcRange[0]}% - {thcRange[1]}%
                {thcRange[0] > 0 || thcRange[1] < 30 && (
                  <span className="ml-2 text-xs text-green-400">●</span>
                )}
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={thcRange[1]}
                onChange={(e) => {
                  setThcRange([thcRange[0], parseInt(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>

            {/* CBD Range */}
            <div>
              <label className="label block mb-2">
                CBD Range: {cbdRange[0]}% - {cbdRange[1]}%
                {cbdRange[0] > 0 || cbdRange[1] < 20 && (
                  <span className="ml-2 text-xs text-green-400">●</span>
                )}
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={cbdRange[1]}
                onChange={(e) => {
                  setCbdRange([cbdRange[0], parseInt(e.target.value)]);
                  setCurrentPage(1);
                }}
                className="w-full"
              />
            </div>
          </div>

          {/* Tags Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label">Filter by Tags</label>
              <button
                onClick={resetFilters}
                className="text-sm text-green-400 hover:text-green-300 underline"
              >
                Reset All Filters
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-green-600 border-green-500 text-white'
                      : 'bg-green-900/30 border-green-700/50 text-green-300 hover:bg-green-800/50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{filteredAndSortedStrains.length}</div>
          <div className="text-green-300">Filtered Strains</div>
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
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {strains.filter(s => s.type?.toLowerCase() === 'hybrid').length}
          </div>
          <div className="text-blue-300">Hybrid Strains</div>
        </div>
      </div>

      {/* Strains Grid */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
            🧬 Available Strains
          </h2>
          <div className="text-green-400 text-sm">
            Showing {startIndex + 1}-{Math.min(startIndex + strainsPerPage, filteredAndSortedStrains.length)} of {filteredAndSortedStrains.length}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <SkeletonLoader type="strain-card" count={6} />
          ) : (
            paginatedStrains.map(strain => (
            <div key={strain.id} className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group">
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
                  <FavoriteButton type="strain" strainId={strain.id} />
                </div>
              </div>
              
              {strain.summary && (
                <p className="text-green-300 text-sm line-clamp-3 mb-4">
                  {strain.summary}
                </p>
              )}

              {/* Tags */}
              {strain.tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {JSON.parse(strain.tags).slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-green-800/30 text-green-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {JSON.parse(strain.tags).length > 3 && (
                    <span className="text-xs px-2 py-1 bg-green-800/30 text-green-400 rounded-full">
                      +{JSON.parse(strain.tags).length - 3}
                    </span>
                  )}
                </div>
              )}
              
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
              
              {/* Hover effect */}
              <div className="mt-3 text-green-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/strains/${strain.id}`} className="hover:underline">
                  Click to view details →
                </Link>
              </div>
            </div>
          ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                currentPage === 1
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Prev
            </button>
            
            <div className="flex gap-1">
              {/* Always show page 1 */}
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 1
                    ? 'bg-green-600 text-white'
                    : 'bg-green-900/30 text-green-300 hover:bg-green-800/50'
                }`}
              >
                1
              </button>
              
              {/* Show ellipsis if we're far from page 1 */}
              {currentPage > 4 && (
                <span className="px-2 py-2 text-green-400">...</span>
              )}
              
              {/* Show pages around current page */}
              {Array.from({ length: Math.min(7, totalPages - 2) }, (_, i) => {
                const startPage = Math.max(2, currentPage - 2);
                const pageNum = startPage + i;
                if (pageNum >= totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-green-600 text-white'
                        : 'bg-green-900/30 text-green-300 hover:bg-green-800/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {/* Show ellipsis if we're far from last page */}
              {currentPage < totalPages - 3 && (
                <span className="px-2 py-2 text-green-400">...</span>
              )}
              
              {/* Always show last page if it's not 1 */}
              {totalPages > 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === totalPages
                      ? 'bg-green-600 text-white'
                      : 'bg-green-900/30 text-green-300 hover:bg-green-800/50'
                  }`}
                >
                  {totalPages}
                </button>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredAndSortedStrains.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-green-300 mb-4">
            No Strains Found
          </h3>
          <p className="text-green-200 mb-6">
            Try adjusting your search criteria or filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("all");
              setSelectedTags([]);
              setThcRange([0, 30]);
              setCurrentPage(1);
            }}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}