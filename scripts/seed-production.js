const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding production database...');

  try {
    // Create admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@weedwiki.com' },
      update: {},
      create: {
        email: 'admin@weedwiki.com',
        name: 'Admin User',
        role: 'ADMIN',
      },
    });

    console.log('✅ Admin user created:', adminUser.email);

    // Create sample strains
    const strains = [
      {
        name: 'Blue Dream',
        type: 'Hybrid',
        summary: 'A balanced hybrid known for its sweet berry aroma and relaxing effects.',
        lineage: 'Blueberry x Haze',
        thcMin: 17.0,
        thcMax: 24.0,
        cbdMin: 0.1,
        cbdMax: 0.2,
        terpenes: 'Myrcene, Pinene, Caryophyllene',
        tags: 'fruity, relaxing, balanced, sweet',
      },
      {
        name: 'OG Kush',
        type: 'Indica',
        summary: 'A classic indica with earthy, pine flavors and strong relaxing effects.',
        lineage: 'Chemdawg x Hindu Kush',
        thcMin: 20.0,
        thcMax: 26.0,
        cbdMin: 0.1,
        cbdMax: 0.3,
        terpenes: 'Limonene, Myrcene, Caryophyllene',
        tags: 'earthy, pine, relaxing, classic',
      },
      {
        name: 'Sour Diesel',
        type: 'Sativa',
        summary: 'An energizing sativa with diesel-like aroma and uplifting effects.',
        lineage: 'Chemdawg x Super Skunk',
        thcMin: 18.0,
        thcMax: 25.0,
        cbdMin: 0.1,
        cbdMax: 0.2,
        terpenes: 'Limonene, Caryophyllene, Humulene',
        tags: 'energizing, uplifting, diesel, citrus',
      },
    ];

    for (const strainData of strains) {
      const strain = await prisma.strain.upsert({
        where: { name: strainData.name },
        update: {},
        create: strainData,
      });
      console.log(`✅ Strain created: ${strain.name}`);
    }

    console.log('🎉 Production database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
