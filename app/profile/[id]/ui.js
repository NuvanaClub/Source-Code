"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function UserProfileUI({ user, currentUser }) {
  const [activeTab, setActiveTab] = useState("grows");

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="grid gap-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-24 h-24 rounded-full border-2 border-green-600"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-green-600 bg-green-900/30 flex items-center justify-center text-3xl">
                👤
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-green-200 mb-2">
                  {user.name || "Anonymous User"}
                </h1>
                <p className="text-green-400 mb-2">@{user.email}</p>
                {user.bio && (
                  <p className="text-green-300 mb-4">{user.bio}</p>
                )}
              </div>
              {isOwnProfile && (
                <Link href="/profile/edit" className="btn text-sm px-4 py-2">
                  ✏️ Edit Profile
                </Link>
              )}
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {user._count.grows}
                </div>
                <div className="text-sm text-green-300">Public Logs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {user._count.comments}
                </div>
                <div className="text-sm text-purple-300">Comments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {user._count.favorites}
                </div>
                <div className="text-sm text-blue-300">Favorites</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="flex flex-wrap gap-4 text-sm text-green-400">
              {user.location && (
                <div className="flex items-center gap-1">
                  📍 {user.location}
                </div>
              )}
              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-green-300 transition-colors"
                >
                  🌐 Website
                </a>
              )}
              <div className="flex items-center gap-1">
                📅 Joined {formatDistanceToNow(new Date(user.createdAt))} ago
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-green-700/30 mb-6">
          <button
            onClick={() => setActiveTab("grows")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "grows"
                ? "text-green-300 border-b-2 border-green-500"
                : "text-green-400 hover:text-green-300"
            }`}
          >
            📊 Grow Logs ({user.grows.length})
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "activity"
                ? "text-green-300 border-b-2 border-green-500"
                : "text-green-400 hover:text-green-300"
            }`}
          >
            🔄 Recent Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "grows" && (
          <div className="space-y-4">
            {user.grows.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-lg font-semibold text-green-300 mb-2">
                  No Public Grow Logs
                </h3>
                <p className="text-green-400">
                  {isOwnProfile 
                    ? "Start sharing your grow logs to build your public profile!"
                    : "This user hasn't shared any grow logs yet."
                  }
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {user.grows.map((grow) => (
                  <div key={grow.id} className="card hover:bg-green-900/30 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <Link href={`/grow/${grow.id}`} className="flex-1">
                        <h3 className="text-lg font-semibold text-green-200 hover:text-green-100 transition-colors">
                          {grow.title}
                        </h3>
                      </Link>
                      <span className="badge">
                        {grow.strain?.type || "Unknown"}
                      </span>
                    </div>
                    
                    {grow.strain && (
                      <div className="mb-3">
                        <Link 
                          href={`/strains/${grow.strain.id}`}
                          className="text-sm text-green-400 hover:text-green-300 transition-colors"
                        >
                          🌱 {grow.strain.name}
                        </Link>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-green-400">
                      <span>{grow._count.entries} entries</span>
                      <span>{formatDistanceToNow(new Date(grow.createdAt))} ago</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-4">
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-green-300 mb-2">
                Activity Feed
              </h3>
              <p className="text-green-400">
                Recent activity will be displayed here in future updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
