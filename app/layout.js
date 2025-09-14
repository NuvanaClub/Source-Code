import "./../styles/globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata = {
  title: "Weed Wiki - Cannabis Strain Database & Grow Logs",
  description: "Neutral strain catalog + personal grow logs (legal-first).",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <header className="border-b border-neutral-800">
            <div className="container py-4 flex items-center justify-between">
              <nav className="flex items-center gap-4">
                <Link href="/" className="font-semibold">Weed Wiki</Link>
                <Link href="/strains">Strains</Link>
                <Link href="/grow">My Logs</Link>
                {session?.user?.role === "ADMIN" && (
                  <Link href="/admin/strains" className="badge">Admin</Link>
                )}
                <Link href="/legal">Legal</Link>
              </nav>
              <div className="flex items-center gap-3">
                {session ? (
                  <form action="/api/auth/signout" method="POST">
                    <button className="btn">Sign out</button>
                  </form>
                ) : (
                  <Link className="btn" href="/login">Sign in</Link>
                )}
              </div>
            </div>
          </header>
          <main className="container py-8">{children}</main>
          <footer className="container py-8 text-sm text-neutral-500">
            © {new Date().getFullYear()} Legal‑first, neutral catalog. No cultivation instructions included.
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}