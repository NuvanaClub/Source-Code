import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import allStrains from "../scripts/all-strains.js";

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

  // Use all 518 strains from original database
  console.log(`🌱 Creating ${allStrains.length} strains...`);
  
  for (const s of allStrains) {
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
  console.log("Strains created:", allStrains.length);
  console.log("Sample grow log created for user");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});