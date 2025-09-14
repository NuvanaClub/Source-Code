import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  // admin
  const hash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    create: { email: "admin@example.com", name: "Admin", password: hash, role: "ADMIN" },
    update: {}
  });

  // a few neutral strains (no how-to information)
  const strains = [
    {
      name: "Aurora Drift",
      type: "Indica",
      summary: "Notes of earth and pine. Neutral catalog entry emphasizing aroma and reported effects without guidance.",
      lineage: "Unknown",
      terpenes: "Myrcene, Caryophyllene",
      thcMin: 14.0, thcMax: 22.0, cbdMin: 0.1, cbdMax: 1.0
    },
    {
      name: "Citrus Haze",
      type: "Sativa",
      summary: "Citrus-forward profile and bright aroma. Neutral description only.",
      lineage: "Haze cross",
      terpenes: "Limonene, Terpinolene",
      thcMin: 16.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 1.0
    },
    {
      name: "Balanced Blend",
      type: "Hybrid",
      summary: "Even-keeled profile in aroma and reported effects. No cultivation how‑to details included.",
      lineage: "Hybrid mix",
      terpenes: "Linalool, Pinene",
      thcMin: 12.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 2.0
    }
  ];

  for (const s of strains) {
    await prisma.strain.upsert({
      where: { name: s.name },
      create: s,
      update: {}
    });
  }

  console.log("Seed complete. Admin:", admin.email);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});