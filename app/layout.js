import "./../styles/globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Nuvana Club - Cannabis Strain Database & Grow Logs",
  description: "Neutral strain catalog + personal grow logs (legal-first).",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <ThemeProvider>
            <header className="border-b border-green-700/30 bg-green-900/20 backdrop-blur-sm">
            <div className="container py-4 flex items-center justify-between">
              <nav className="flex items-center gap-6">
                <Link href="/" className="font-bold text-2xl weed-leaf">
                  🌿 Nuvana Club
                </Link>
                <div className="hidden md:flex items-center gap-4">
                  <Link href="/strains" className="text-green-200 hover:text-green-300 transition-colors duration-300 font-medium">
                    🌱 Strains
                  </Link>
                  <Link href="/grow" className="text-green-200 hover:text-green-300 transition-colors duration-300 font-medium">
                    📊 My Logs
                  </Link>
                  <Link href="/favorites" className="text-green-200 hover:text-green-300 transition-colors duration-300 font-medium">
                    ❤️ Favorites
                  </Link>
                  {session?.user?.role === "ADMIN" && (
                    <>
                      <Link href="/admin/strains" className="badge">
                        👑 Admin
                      </Link>
                      <Link href="/admin/audit" className="badge">
                        🔍 Audit
                      </Link>
                    </>
                  )}
                  <Link href="/legal" className="text-green-200 hover:text-green-300 transition-colors duration-300 font-medium">
                    ⚖️ Legal
                  </Link>
                </div>
              </nav>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                {session ? (
                  <div className="flex items-center gap-3">
                    {session.user?.image && (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name} 
                        className="w-8 h-8 rounded-full border-2 border-green-600"
                      />
                    )}
                    <span className="text-green-300 text-sm">
                      Welcome, {session.user?.name || session.user?.email}
                    </span>
                    <form action="/api/auth/signout" method="POST">
                      <button className="btn text-sm px-4 py-2">
                        🚪 Sign out
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link className="btn text-sm px-4 py-2" href="/login">
                      🔑 Sign in
                    </Link>
                    <Link className="btn btn-primary text-sm px-4 py-2" href="/register">
                      🚀 Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main className="container py-8">{children}</main>
          <footer className="border-t border-green-700/30 bg-green-900/10 backdrop-blur-sm">
            <div className="container py-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-300 mb-3">🌿 Nuvana Club</h3>
                  <p className="text-green-200 text-sm">
                    Your comprehensive cannabis knowledge hub. Legal-first, neutral catalog.
                  </p>
                </div>
                <div>
                  <h4 className="text-green-300 font-medium mb-3">Quick Links</h4>
                  <div className="space-y-2 text-sm">
                    <Link href="/strains" className="block text-green-200 hover:text-green-300 transition-colors">
                      🌱 Browse Strains
                    </Link>
                    <Link href="/grow" className="block text-green-200 hover:text-green-300 transition-colors">
                      📊 Grow Logs
                    </Link>
                    <Link href="/legal" className="block text-green-200 hover:text-green-300 transition-colors">
                      ⚖️ Legal Info
                    </Link>
                  </div>
                </div>
                <div>
                  <h4 className="text-green-300 font-medium mb-3">Important</h4>
                  <p className="text-green-200 text-sm">
                    Always check local laws and regulations. No cultivation instructions provided.
                  </p>
                </div>
              </div>
              <div className="border-t border-green-700/30 mt-6 pt-6 text-center text-green-300 text-sm">
                © {new Date().getFullYear()} Nuvana Club. Legal-first, neutral catalog. No cultivation instructions included.
              </div>
            </div>
          </footer>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}