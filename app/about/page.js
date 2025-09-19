import Link from "next/link";

export const metadata = {
  title: "About Nuvana Club - Cannabis Knowledge Hub",
  description: "Learn about Nuvana Club's mission, tech stack, and commitment to legal-first cannabis education.",
};

export default function AboutPage() {
  return (
    <div className="grid gap-8">
      {/* Hero Section */}
      <div className="card hero-gradient glow text-center">
        <h1 className="text-4xl font-bold mb-4 weed-leaf">
          About Nuvana Club
        </h1>
        <p className="text-xl text-green-200 mb-2">
          Your comprehensive cannabis knowledge hub
        </p>
        <p className="text-green-300">
          Legal-first, neutral catalog with personal grow tracking
        </p>
      </div>

      {/* Mission Statement */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
          🎯 Our Mission
        </h2>
        <div className="prose prose-green max-w-none">
          <p className="text-green-200 text-lg leading-relaxed">
            Nuvana Club was created to provide a comprehensive, neutral platform for cannabis education 
            and personal grow tracking. We believe in the power of knowledge and responsible information 
            sharing while maintaining strict compliance with legal frameworks.
          </p>
          <p className="text-green-200 text-lg leading-relaxed mt-4">
            Our platform serves as a bridge between cannabis enthusiasts, researchers, and the broader 
            community, offering detailed strain information, personal growth tracking, and educational 
            resources—all while maintaining a legal-first approach.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
            🌱 Strain Database
          </h3>
          <ul className="space-y-2 text-green-200">
            <li>• Comprehensive strain information</li>
            <li>• THC/CBD content ranges</li>
            <li>• Terpene profiles and effects</li>
            <li>• Advanced search and filtering</li>
            <li>• Tag-based categorization</li>
            <li>• Community comments and reviews</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
            📊 Grow Tracking
          </h3>
          <ul className="space-y-2 text-green-200">
            <li>• Personal grow log management</li>
            <li>• Structured data collection</li>
            <li>• Growth metrics visualization</li>
            <li>• Photo documentation</li>
            <li>• Export to PDF/CSV</li>
            <li>• Privacy controls</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
            🔐 Security & Privacy
          </h3>
          <ul className="space-y-2 text-green-200">
            <li>• Role-based access control</li>
            <li>• OAuth integration</li>
            <li>• Data encryption</li>
            <li>• Audit logging</li>
            <li>• Privacy-first design</li>
            <li>• GDPR compliance ready</li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-green-300 mb-4 flex items-center gap-2">
            ⚖️ Legal Compliance
          </h3>
          <ul className="space-y-2 text-green-200">
            <li>• No cultivation instructions</li>
            <li>• Educational content only</li>
            <li>• Jurisdiction-specific compliance</li>
            <li>• Legal disclaimers</li>
            <li>• Age verification</li>
            <li>• Responsible information sharing</li>
          </ul>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-6 flex items-center gap-2">
          🛠️ Technology Stack
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Frontend</h3>
            <ul className="space-y-1 text-green-200">
              <li>• Next.js 14 (App Router)</li>
              <li>• React 18</li>
              <li>• Tailwind CSS</li>
              <li>• Recharts (Data Visualization)</li>
              <li>• NextAuth (Authentication)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Backend</h3>
            <ul className="space-y-1 text-green-200">
              <li>• Next.js API Routes</li>
              <li>• Prisma ORM</li>
              <li>• SQLite (Development)</li>
              <li>• PostgreSQL (Production)</li>
              <li>• bcryptjs (Password Hashing)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">DevOps & Tools</h3>
            <ul className="space-y-1 text-green-200">
              <li>• Docker & Docker Compose</li>
              <li>• GitHub Actions (CI/CD)</li>
              <li>• Vercel (Deployment)</li>
              <li>• AWS S3 (File Storage)</li>
              <li>• Zod (Validation)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-6 flex items-center gap-2">
          👨‍💻 About the Developer
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">VoxHash</h3>
            <p className="text-green-200 mb-4">
              AI Engineer specializing in blockchain, Web3, and smart contracts. 
              Passionate about building innovative solutions that bridge technology 
              and real-world applications.
            </p>
            <div className="space-y-2">
              <p className="text-green-300">
                <strong>Expertise:</strong> Full-stack development, AI/ML, blockchain technology
              </p>
              <p className="text-green-300">
                <strong>Focus:</strong> Scalable web applications, smart contracts, DeFi protocols
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Connect</h3>
            <div className="space-y-3">
              <a 
                href="https://github.com/voxhash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/voxhash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href="https://voxhash.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 18.5c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z"/>
                </svg>
                Portfolio
              </a>
              <a 
                href="mailto:contact@voxhash.dev" 
                className="flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="card border-red-700/30 bg-red-900/10">
        <h2 className="text-2xl font-semibold text-red-300 mb-4 flex items-center gap-2">
          ⚖️ Legal Disclaimer
        </h2>
        <div className="prose prose-red max-w-none">
          <p className="text-red-200 text-sm leading-relaxed">
            <strong>Important:</strong> Nuvana Club is designed for educational and informational purposes only. 
            This application does not provide cultivation instructions or encourage illegal activities. 
            Users are responsible for complying with all applicable laws and regulations in their jurisdiction. 
            Always check local laws before engaging in any cannabis-related activities.
          </p>
          <p className="text-red-200 text-sm leading-relaxed mt-3">
            The information provided on this platform is for general informational purposes only and should 
            not be considered as legal, medical, or professional advice. Consult with appropriate professionals 
            for specific guidance related to your situation.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="card text-center">
        <h2 className="text-2xl font-semibold text-green-300 mb-4">
          Ready to Explore?
        </h2>
        <p className="text-green-200 mb-6">
          Join our community of cannabis enthusiasts and start your journey today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/strains" className="btn btn-primary">
            🌱 Browse Strains
          </Link>
          <Link href="/register" className="btn">
            🚀 Get Started
          </Link>
          <Link href="/legal" className="btn btn-secondary">
            ⚖️ Legal Info
          </Link>
        </div>
      </div>
    </div>
  );
}
