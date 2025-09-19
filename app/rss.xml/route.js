import prisma from "@/lib/prisma";

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  
  try {
    // Get recent strains
    const strains = await prisma.strain.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        summary: true,
        type: true,
        createdAt: true
      }
    });

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nuvana Club - Cannabis Strain Database</title>
    <description>Latest cannabis strains added to Nuvana Club - Legal-first educational platform</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Nuvana Club</generator>
    
    ${strains.map(strain => `
    <item>
      <title>${strain.name} - ${strain.type || 'Hybrid'} Strain</title>
      <description><![CDATA[${strain.summary || 'New strain added to the database'}]]></description>
      <link>${baseUrl}/strains/${strain.id}</link>
      <guid isPermaLink="true">${baseUrl}/strains/${strain.id}</guid>
      <pubDate>${new Date(strain.createdAt).toUTCString()}</pubDate>
      <category>${strain.type || 'Hybrid'}</category>
    </item>`).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
      headers: {
        "Content-Type": "application/rss+xml",
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
