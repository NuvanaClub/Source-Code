export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  const robotsTxt = `User-agent: *
Allow: /
Allow: /strains
Allow: /about
Allow: /legal
Disallow: /admin
Disallow: /grow
Disallow: /api
Disallow: /favorites

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600"
    }
  });
}