import prisma from "@/lib/prisma";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  try {
    // Get all strains
    const strains = await prisma.strain.findMany({
      select: { id: true, updatedAt: true }
    });

    // Static pages
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "daily" },
      { url: "/strains", priority: "0.9", changefreq: "daily" },
      { url: "/about", priority: "0.8", changefreq: "monthly" },
      { url: "/legal", priority: "0.7", changefreq: "monthly" },
      { url: "/login", priority: "0.6", changefreq: "monthly" },
      { url: "/register", priority: "0.6", changefreq: "monthly" }
    ];

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${strains.map(strain => `
  <url>
    <loc>${baseUrl}/strains/${strain.id}</loc>
    <lastmod>${new Date(strain.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
