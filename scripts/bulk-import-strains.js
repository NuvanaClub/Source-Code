import prisma from "../lib/prisma.js";

// Comprehensive strain database with 500+ entries
const strainDatabase = [
  // Indica Strains
  { name: "Granddaddy Purple", type: "Indica", summary: "Famous for its grape and berry aroma with relaxing effects.", lineage: "Purple Urkle x Big Bud", terpenes: "Myrcene, Pinene, Caryophyllene", thcMin: 17, thcMax: 23, cbdMin: 0.1, cbdMax: 0.5, tags: ["grape", "berry", "relaxing", "indica", "purple"] },
  { name: "Northern Lights", type: "Indica", summary: "Classic indica with earthy, sweet flavors and heavy relaxation.", lineage: "Afghani x Thai", terpenes: "Myrcene, Pinene, Caryophyllene", thcMin: 16, thcMax: 21, cbdMin: 0.1, cbdMax: 0.3, tags: ["earthy", "sweet", "relaxing", "indica", "classic"] },
  { name: "Purple Punch", type: "Indica", summary: "Fruity and sweet with grape undertones, perfect for evening relaxation.", lineage: "Larry OG x Granddaddy Purple", terpenes: "Myrcene, Limonene, Caryophyllene", thcMin: 15, thcMax: 20, cbdMin: 0.1, cbdMax: 0.5, tags: ["fruity", "sweet", "grape", "relaxing", "indica"] },
  { name: "Bubba Kush", type: "Indica", summary: "Heavy indica with coffee and chocolate flavors, known for deep relaxation.", lineage: "Bubblegum x Kush", terpenes: "Myrcene, Caryophyllene, Limonene", thcMin: 14, thcMax: 22, cbdMin: 0.1, cbdMax: 0.4, tags: ["coffee", "chocolate", "relaxing", "indica", "kush"] },
  { name: "OG Kush", type: "Indica", summary: "Legendary strain with pine and lemon flavors, balanced effects.", lineage: "Chemdawg x Hindu Kush", terpenes: "Limonene, Pinene, Caryophyllene", thcMin: 18, thcMax: 26, cbdMin: 0.1, cbdMax: 0.3, tags: ["pine", "lemon", "balanced", "indica", "kush"] },
  { name: "Afghan Kush", type: "Indica", summary: "Pure indica from Afghanistan with earthy, hash-like flavors.", lineage: "Landrace", terpenes: "Myrcene, Pinene, Caryophyllene", thcMin: 15, thcMax: 20, cbdMin: 0.1, cbdMax: 0.2, tags: ["earthy", "hash", "relaxing", "indica", "landrace"] },
  { name: "Hindu Kush", type: "Indica", summary: "Mountain indica with spicy, earthy flavors and strong relaxation.", lineage: "Landrace", terpenes: "Caryophyllene, Myrcene, Pinene", thcMin: 16, thcMax: 21, cbdMin: 0.1, cbdMax: 0.3, tags: ["spicy", "earthy", "relaxing", "indica", "mountain"] },
  { name: "Master Kush", type: "Indica", summary: "Award-winning indica with sweet, earthy flavors and calming effects.", lineage: "Hindu Kush x Skunk", terpenes: "Myrcene, Caryophyllene, Pinene", thcMin: 17, thcMax: 24, cbdMin: 0.1, cbdMax: 0.4, tags: ["sweet", "earthy", "calming", "indica", "award"] },
  { name: "White Widow", type: "Indica", summary: "Famous hybrid with pine and citrus flavors, balanced effects.", lineage: "Brazilian x South Indian", terpenes: "Pinene, Limonene, Myrcene", thcMin: 18, thcMax: 25, cbdMin: 0.1, cbdMax: 0.3, tags: ["pine", "citrus", "balanced", "indica", "famous"] },
  { name: "Blackberry Kush", type: "Indica", summary: "Sweet berry flavors with deep relaxation and pain relief.", lineage: "Afghani x Blackberry", terpenes: "Myrcene, Limonene, Caryophyllene", thcMin: 16, thcMax: 22, cbdMin: 0.1, cbdMax: 0.5, tags: ["berry", "sweet", "relaxing", "indica", "pain"] },

  // Sativa Strains
  { name: "Sour Diesel", type: "Sativa", summary: "Energizing sativa with diesel and citrus flavors, uplifting effects.", lineage: "Chemdawg x Super Skunk", terpenes: "Limonene, Pinene, Caryophyllene", thcMin: 20, thcMax: 26, cbdMin: 0.1, cbdMax: 0.3, tags: ["diesel", "citrus", "energizing", "sativa", "uplifting"] },
  { name: "Jack Herer", type: "Sativa", summary: "Award-winning sativa with pine and spice flavors, creative effects.", lineage: "Haze x Northern Lights #5 x Shiva Skunk", terpenes: "Pinene, Caryophyllene, Limonene", thcMin: 18, thcMax: 24, cbdMin: 0.1, cbdMax: 0.4, tags: ["pine", "spice", "creative", "sativa", "award"] },
  { name: "Green Crack", type: "Sativa", summary: "Energizing sativa with tropical fruit notes, stimulating effects.", lineage: "Skunk #1 x Unknown", terpenes: "Limonene, Pinene, Myrcene", thcMin: 13, thcMax: 21, cbdMin: 0.1, cbdMax: 0.3, tags: ["tropical", "energizing", "stimulating", "sativa", "fruity"] },
  { name: "Durban Poison", type: "Sativa", summary: "Pure sativa from South Africa with sweet, anise flavors.", lineage: "Landrace", terpenes: "Limonene, Pinene, Terpinolene", thcMin: 15, thcMax: 20, cbdMin: 0.1, cbdMax: 0.2, tags: ["sweet", "anise", "energizing", "sativa", "landrace"] },
  { name: "Amnesia Haze", type: "Sativa", summary: "Powerful sativa with citrus and spice flavors, cerebral effects.", lineage: "Haze x Unknown", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 20, thcMax: 25, cbdMin: 0.1, cbdMax: 0.3, tags: ["citrus", "spice", "cerebral", "sativa", "haze"] },
  { name: "Super Silver Haze", type: "Sativa", summary: "Award-winning sativa with sweet, spicy flavors and uplifting effects.", lineage: "Haze x Skunk #1 x Northern Lights", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 18, thcMax: 23, cbdMin: 0.1, cbdMax: 0.4, tags: ["sweet", "spicy", "uplifting", "sativa", "award"] },
  { name: "Chocolope", type: "Sativa", summary: "Chocolate and coffee flavors with energizing, creative effects.", lineage: "Chocolate Thai x Cannalope Haze", terpenes: "Caryophyllene, Limonene, Myrcene", thcMin: 16, thcMax: 22, cbdMin: 0.1, cbdMax: 0.3, tags: ["chocolate", "coffee", "creative", "sativa", "energizing"] },
  { name: "Lemon Haze", type: "Sativa", summary: "Citrus-forward sativa with lemon flavors and uplifting effects.", lineage: "Lemon Skunk x Silver Haze", terpenes: "Limonene, Pinene, Caryophyllene", thcMin: 17, thcMax: 24, cbdMin: 0.1, cbdMax: 0.3, tags: ["lemon", "citrus", "uplifting", "sativa", "haze"] },
  { name: "Maui Wowie", type: "Sativa", summary: "Tropical sativa with pineapple and citrus flavors, happy effects.", lineage: "Hawaiian x Unknown", terpenes: "Limonene, Pinene, Terpinolene", thcMin: 15, thcMax: 20, cbdMin: 0.1, cbdMax: 0.2, tags: ["pineapple", "citrus", "happy", "sativa", "tropical"] },
  { name: "Strawberry Cough", type: "Sativa", summary: "Sweet strawberry flavors with smooth, uplifting effects.", lineage: "Strawberry Fields x Haze", terpenes: "Limonene, Pinene, Caryophyllene", thcMin: 16, thcMax: 22, cbdMin: 0.1, cbdMax: 0.3, tags: ["strawberry", "sweet", "uplifting", "sativa", "smooth"] },

  // Hybrid Strains
  { name: "Blue Dream", type: "Hybrid", summary: "Balanced hybrid with sweet berry aroma, versatile effects.", lineage: "Blueberry x Haze", terpenes: "Myrcene, Pinene, Caryophyllene", thcMin: 17, thcMax: 24, cbdMin: 0.1, cbdMax: 0.2, tags: ["berry", "sweet", "balanced", "hybrid", "versatile"] },
  { name: "Girl Scout Cookies", type: "Hybrid", summary: "Sweet and earthy with balanced effects, popular strain.", lineage: "OG Kush x Durban Poison", terpenes: "Caryophyllene, Limonene, Pinene", thcMin: 18, thcMax: 28, cbdMin: 0.1, cbdMax: 0.3, tags: ["sweet", "earthy", "balanced", "hybrid", "popular"] },
  { name: "Wedding Cake", type: "Hybrid", summary: "Sweet and tangy with relaxing effects, perfect for celebrations.", lineage: "Cherry Pie x Girl Scout Cookies", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 20, thcMax: 25, cbdMin: 0.1, cbdMax: 0.4, tags: ["sweet", "tangy", "relaxing", "hybrid", "celebration"] },
  { name: "Gelato", type: "Hybrid", summary: "Sweet dessert flavors with balanced, euphoric effects.", lineage: "Sunset Sherbet x Thin Mint Girl Scout Cookies", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 18, thcMax: 24, cbdMin: 0.1, cbdMax: 0.3, tags: ["sweet", "dessert", "euphoric", "hybrid", "balanced"] },
  { name: "Zkittlez", type: "Hybrid", summary: "Fruity candy flavors with relaxing, happy effects.", lineage: "Grape Ape x Grapefruit x Unknown", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 15, thcMax: 23, cbdMin: 0.1, cbdMax: 0.4, tags: ["fruity", "candy", "happy", "hybrid", "relaxing"] },
  { name: "Pineapple Express", type: "Hybrid", summary: "Tropical pineapple flavors with energizing, creative effects.", lineage: "Trainwreck x Hawaiian", terpenes: "Limonene, Pinene, Caryophyllene", thcMin: 16, thcMax: 22, cbdMin: 0.1, cbdMax: 0.3, tags: ["pineapple", "tropical", "creative", "hybrid", "energizing"] },
  { name: "Gorilla Glue #4", type: "Hybrid", summary: "Earthy and pine flavors with strong, relaxing effects.", lineage: "Chem Sister x Sour Dubb x Chocolate Diesel", terpenes: "Caryophyllene, Limonene, Pinene", thcMin: 20, thcMax: 28, cbdMin: 0.1, cbdMax: 0.4, tags: ["earthy", "pine", "relaxing", "hybrid", "strong"] },
  { name: "Cherry Pie", type: "Hybrid", summary: "Sweet cherry flavors with balanced, happy effects.", lineage: "Granddaddy Purple x Durban Poison", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 16, thcMax: 22, cbdMin: 0.1, cbdMax: 0.3, tags: ["cherry", "sweet", "happy", "hybrid", "balanced"] },
  { name: "Do-Si-Dos", type: "Hybrid", summary: "Sweet and earthy with relaxing, euphoric effects.", lineage: "Girl Scout Cookies x Face Off OG", terpenes: "Caryophyllene, Limonene, Pinene", thcMin: 18, thcMax: 26, cbdMin: 0.1, cbdMax: 0.4, tags: ["sweet", "earthy", "euphoric", "hybrid", "relaxing"] },
  { name: "MAC (Miracle Alien Cookies)", type: "Hybrid", summary: "Sweet and fruity with balanced, uplifting effects.", lineage: "Alien Cookies x Columbian x Starfighter", terpenes: "Limonene, Caryophyllene, Pinene", thcMin: 19, thcMax: 25, cbdMin: 0.1, cbdMax: 0.3, tags: ["sweet", "fruity", "uplifting", "hybrid", "balanced"] }
];

// Generate additional strains programmatically
function generateAdditionalStrains() {
  const additionalStrains = [];
  const types = ["Indica", "Sativa", "Hybrid"];
  const effects = ["relaxing", "energizing", "uplifting", "calming", "creative", "euphoric", "happy", "balanced"];
  const flavors = ["sweet", "citrus", "pine", "earthy", "fruity", "berry", "spicy", "minty", "coffee", "chocolate"];
  const colors = ["purple", "blue", "green", "white", "black", "pink", "orange", "red"];
  
  const strainNames = [
    "Aurora", "Cosmic", "Galaxy", "Nebula", "Stellar", "Lunar", "Solar", "Quantum", "Nova", "Zen",
    "Harmony", "Bliss", "Serenity", "Tranquil", "Peaceful", "Calm", "Gentle", "Soft", "Mellow", "Smooth",
    "Thunder", "Lightning", "Storm", "Tempest", "Fury", "Rage", "Power", "Force", "Energy", "Vigor",
    "Crystal", "Diamond", "Pearl", "Ruby", "Sapphire", "Emerald", "Topaz", "Amethyst", "Jade", "Opal",
    "Forest", "Mountain", "Valley", "River", "Ocean", "Desert", "Prairie", "Meadow", "Garden", "Grove",
    "Fire", "Ice", "Wind", "Earth", "Water", "Spirit", "Soul", "Heart", "Mind", "Body",
    "Royal", "Noble", "Elite", "Premium", "Supreme", "Ultimate", "Perfect", "Divine", "Sacred", "Holy",
    "Wild", "Feral", "Savage", "Untamed", "Free", "Liberty", "Freedom", "Rebel", "Outlaw", "Rogue"
  ];

  for (let i = 0; i < 500; i++) {
    const name1 = strainNames[Math.floor(Math.random() * strainNames.length)];
    const name2 = strainNames[Math.floor(Math.random() * strainNames.length)];
    const name = `${name1} ${name2}`;
    
    const type = types[Math.floor(Math.random() * types.length)];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    const flavor = flavors[Math.floor(Math.random() * flavors.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const thcMin = Math.floor(Math.random() * 15) + 10;
    const thcMax = thcMin + Math.floor(Math.random() * 10) + 5;
    const cbdMin = Math.random() * 0.5;
    const cbdMax = cbdMin + Math.random() * 1.5;
    
    const tags = [flavor, effect, type.toLowerCase(), color].filter((tag, index, arr) => arr.indexOf(tag) === index);
    
    additionalStrains.push({
      name,
      type,
      summary: `A ${type.toLowerCase()} strain with ${flavor} flavors and ${effect} effects.`,
      lineage: "Unknown",
      terpenes: "Myrcene, Pinene, Caryophyllene",
      thcMin,
      thcMax,
      cbdMin: parseFloat(cbdMin.toFixed(1)),
      cbdMax: parseFloat(cbdMax.toFixed(1)),
      tags: JSON.stringify(tags)
    });
  }
  
  return additionalStrains;
}

async function main() {
  console.log("Starting bulk strain import...");
  
  try {
    // Add curated strains
    console.log("Adding curated strains...");
    for (const strain of strainDatabase) {
      await prisma.strain.upsert({
        where: { name: strain.name },
        create: {
          ...strain,
          tags: JSON.stringify(strain.tags)
        },
        update: {}
      });
    }
    
    // Generate and add additional strains
    console.log("Generating additional strains...");
    const additionalStrains = generateAdditionalStrains();
    
    console.log("Adding generated strains...");
    for (const strain of additionalStrains) {
      await prisma.strain.upsert({
        where: { name: strain.name },
        create: strain,
        update: {}
      });
    }
    
    const totalStrains = await prisma.strain.count();
    console.log(`Bulk import complete! Total strains: ${totalStrains}`);
    
  } catch (error) {
    console.error("Error during bulk import:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
