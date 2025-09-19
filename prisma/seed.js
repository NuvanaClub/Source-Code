import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  // Create admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    create: { 
      email: "admin@example.com", 
      name: "Admin", 
      password: adminHash, 
      role: "ADMIN",
      bio: "System administrator for Weed Wiki",
      location: "Global"
    },
    update: {}
  });

  // Create contributor user
  const contributorHash = await bcrypt.hash("contrib123", 10);
  const contributor = await prisma.user.upsert({
    where: { email: "contributor@example.com" },
    create: { 
      email: "contributor@example.com", 
      name: "Contributor", 
      password: contributorHash, 
      role: "CONTRIBUTOR",
      bio: "Cannabis enthusiast and strain researcher",
      location: "California, USA"
    },
    update: {}
  });

  // Create regular user
  const userHash = await bcrypt.hash("user123", 10);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    create: { 
      email: "user@example.com", 
      name: "Regular User", 
      password: userHash, 
      role: "USER",
      bio: "Cannabis enthusiast exploring strains",
      location: "Oregon, USA"
    },
    update: {}
  });

  // Comprehensive strain data with tags
  const strains = [
    {
      name: "Aurora Drift",
      type: "Indica",
      summary: "Notes of earth and pine. Neutral catalog entry emphasizing aroma and reported effects without guidance.",
      lineage: "Unknown",
      terpenes: "Myrcene, Caryophyllene",
      thcMin: 14.0, thcMax: 22.0, cbdMin: 0.1, cbdMax: 1.0,
      tags: JSON.stringify(["earthy", "pine", "relaxing", "indica"])
    },
    {
      name: "Citrus Haze",
      type: "Sativa",
      summary: "Citrus-forward profile and bright aroma. Neutral description only.",
      lineage: "Haze cross",
      terpenes: "Limonene, Terpinolene",
      thcMin: 16.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 1.0,
      tags: JSON.stringify(["citrus", "energizing", "sativa", "bright"])
    },
    {
      name: "Balanced Blend",
      type: "Hybrid",
      summary: "Even-keeled profile in aroma and reported effects. No cultivation how‑to details included.",
      lineage: "Hybrid mix",
      terpenes: "Linalool, Pinene",
      thcMin: 12.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 2.0,
      tags: JSON.stringify(["balanced", "hybrid", "versatile", "smooth"])
    },
    {
      name: "Purple Punch",
      type: "Indica",
      summary: "Fruity and sweet with grape undertones. Popular for evening relaxation.",
      lineage: "Larry OG x Granddaddy Purple",
      terpenes: "Myrcene, Limonene, Caryophyllene",
      thcMin: 15.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 0.5,
      tags: JSON.stringify(["fruity", "sweet", "grape", "relaxing", "indica"])
    },
    {
      name: "Green Crack",
      type: "Sativa",
      summary: "Energizing and uplifting with tropical fruit notes. Known for its stimulating effects.",
      lineage: "Skunk #1 x Unknown",
      terpenes: "Limonene, Pinene, Myrcene",
      thcMin: 13.0, thcMax: 21.0, cbdMin: 0.1, cbdMax: 0.3,
      tags: JSON.stringify(["energizing", "tropical", "uplifting", "sativa"])
    },
    {
      name: "Blue Dream",
      type: "Hybrid",
      summary: "Balanced hybrid with sweet berry aroma. Popular for its versatility and smooth effects.",
      lineage: "Blueberry x Haze",
      terpenes: "Myrcene, Pinene, Caryophyllene",
      thcMin: 17.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 0.2,
      tags: JSON.stringify(["sweet", "berry", "balanced", "versatile", "hybrid"])
    }
  ];

  for (const s of strains) {
    await prisma.strain.upsert({
      where: { name: s.name },
      create: s,
      update: {}
    });
  }

  // Create sample grow logs
  const grow1 = await prisma.grow.create({
    data: {
      title: "My First Grow - Blue Dream",
      userId: user.id,
      strainId: (await prisma.strain.findUnique({ where: { name: "Blue Dream" } })).id,
      visibility: "private"
    }
  });

  // Add grow entries with structured data
  await prisma.growEntry.create({
    data: {
      growId: grow1.id,
      note: "Planted seeds in small pots with organic soil",
      stage: "seedling",
      plantHeight: 2.5,
      leafCount: 2,
      temperature: 22.0,
      humidity: 65.0,
      ph: 6.2
    }
  });

  await prisma.growEntry.create({
    data: {
      growId: grow1.id,
      note: "Plants showing good growth, first true leaves appearing",
      stage: "vegetative",
      plantHeight: 8.0,
      leafCount: 8,
      temperature: 24.0,
      humidity: 60.0,
      ph: 6.0
    }
  });

  console.log("Seed complete. Users:", admin.email, contributor.email, user.email);
  console.log("Strains created:", strains.length);
  console.log("Sample grow log created for user");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});