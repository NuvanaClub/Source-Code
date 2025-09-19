import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      {/* Hero Section */}
      <div className="card hero-gradient glow">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 weed-leaf">
            🌿 Nuvana Club
          </h1>
          <p className="text-2xl text-green-200 mb-2 font-medium">
            Your Cannabis Knowledge Hub
          </p>
          <p className="text-lg text-green-300 mb-8 max-w-3xl mx-auto">
            Discover strains, track your grows, and explore the world of cannabis with our comprehensive, 
            legal-first platform. No cultivation instructions included.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/strains" className="btn btn-primary text-lg px-8 py-4">
              🌱 Browse Strains
            </Link>
            <Link href="/grow" className="btn btn-secondary text-lg px-8 py-4">
              📊 My Grow Logs
            </Link>
            <Link href="/legal" className="btn text-lg px-8 py-4">
              ⚖️ Legal Info
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-4xl mb-4">🧬</div>
          <h3 className="text-xl font-semibold text-green-300 mb-3">Strain Database</h3>
          <p className="text-green-200">
            Explore detailed information about cannabis strains, their effects, and characteristics.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-xl font-semibold text-green-300 mb-3">Grow Tracking</h3>
          <p className="text-green-200">
            Log your growing journey with photos, notes, and progress tracking.
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-4xl mb-4">⚖️</div>
          <h3 className="text-xl font-semibold text-green-300 mb-3">Legal First</h3>
          <p className="text-green-200">
            Always check local laws and regulations before any cannabis-related activities.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card text-center">
        <h2 className="text-3xl font-bold text-green-300 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg text-green-200 mb-6">
          Join our community of cannabis enthusiasts and start your journey today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register" className="btn btn-primary text-lg px-8 py-4">
            🚀 Get Started
          </Link>
          <Link href="/strains" className="btn text-lg px-8 py-4">
            🔍 Explore Strains
          </Link>
        </div>
      </div>
    </div>
  );
}