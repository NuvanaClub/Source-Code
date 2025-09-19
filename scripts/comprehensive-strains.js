// Comprehensive strain data for seeding
const comprehensiveStrains = [
  // Indica Strains
  {
    name: "Purple Punch",
    type: "Indica",
    summary: "Fruity and sweet with grape undertones. Popular for evening relaxation and stress relief.",
    lineage: "Larry OG x Granddaddy Purple",
    terpenes: "Myrcene, Limonene, Caryophyllene",
    thcMin: 15.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 0.5,
    tags: "fruity, sweet, grape, relaxing, indica, evening"
  },
  {
    name: "Granddaddy Purple",
    type: "Indica",
    summary: "Classic indica with grape and berry flavors. Known for its relaxing and sedating effects.",
    lineage: "Purple Urkle x Big Bud",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 17.0, thcMax: 23.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "grape, berry, relaxing, sedating, indica, classic"
  },
  {
    name: "Northern Lights",
    type: "Indica",
    summary: "Pure indica with sweet and spicy flavors. One of the most famous strains for relaxation.",
    lineage: "Afghani x Thai",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 16.0, thcMax: 21.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "sweet, spicy, relaxing, pure, indica, famous"
  },
  {
    name: "Bubba Kush",
    type: "Indica",
    summary: "Heavy indica with coffee and chocolate flavors. Perfect for evening use and pain relief.",
    lineage: "Bubba Kush x Unknown",
    terpenes: "Myrcene, Caryophyllene, Limonene",
    thcMin: 14.0, thcMax: 22.0, cbdMin: 0.1, cbdMax: 0.4,
    tags: "coffee, chocolate, heavy, indica, evening, pain"
  },
  {
    name: "Afghan Kush",
    type: "Indica",
    summary: "Pure landrace indica with earthy and pine flavors. Traditional strain from Afghanistan.",
    lineage: "Landrace",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 15.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "earthy, pine, landrace, traditional, indica, pure"
  },

  // Sativa Strains
  {
    name: "Sour Diesel",
    type: "Sativa",
    summary: "Energizing sativa with diesel and citrus flavors. Known for its uplifting and creative effects.",
    lineage: "Chemdawg x Super Skunk",
    terpenes: "Caryophyllene, Limonene, Myrcene",
    thcMin: 18.0, thcMax: 25.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "diesel, citrus, energizing, uplifting, sativa, creative"
  },
  {
    name: "Green Crack",
    type: "Sativa",
    summary: "Energizing and uplifting with tropical fruit notes. Known for its stimulating effects.",
    lineage: "Skunk #1 x Unknown",
    terpenes: "Limonene, Pinene, Myrcene",
    thcMin: 13.0, thcMax: 21.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "energizing, tropical, uplifting, sativa, stimulating, fruity"
  },
  {
    name: "Jack Herer",
    type: "Sativa",
    summary: "Classic sativa with pine and earthy flavors. Named after the cannabis activist Jack Herer.",
    lineage: "Haze x Northern Lights #5 x Shiva Skunk",
    terpenes: "Pinene, Myrcene, Caryophyllene",
    thcMin: 15.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "pine, earthy, classic, sativa, uplifting, legendary"
  },
  {
    name: "Durban Poison",
    type: "Sativa",
    summary: "Pure sativa landrace with sweet and spicy flavors. Known for its energizing effects.",
    lineage: "Landrace",
    terpenes: "Terpinolene, Myrcene, Pinene",
    thcMin: 15.0, thcMax: 20.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "sweet, spicy, landrace, sativa, energizing, pure"
  },
  {
    name: "Super Silver Haze",
    type: "Sativa",
    summary: "Award-winning sativa with citrus and spice flavors. Known for its cerebral effects.",
    lineage: "Haze x Northern Lights #5 x Skunk #1",
    terpenes: "Limonene, Caryophyllene, Myrcene",
    thcMin: 18.0, thcMax: 23.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "citrus, spice, award-winning, sativa, cerebral, haze"
  },

  // Hybrid Strains
  {
    name: "Blue Dream",
    type: "Hybrid",
    summary: "Balanced hybrid with sweet berry aroma. Popular for its versatility and smooth effects.",
    lineage: "Blueberry x Haze",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 17.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "sweet, berry, balanced, versatile, hybrid, popular"
  },
  {
    name: "OG Kush",
    type: "Hybrid",
    summary: "Classic hybrid with earthy and pine flavors. One of the most influential strains ever.",
    lineage: "Chemdawg x Hindu Kush",
    terpenes: "Limonene, Myrcene, Caryophyllene",
    thcMin: 20.0, thcMax: 26.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "earthy, pine, classic, hybrid, influential, legendary"
  },
  {
    name: "White Widow",
    type: "Hybrid",
    summary: "Balanced hybrid with earthy and woody flavors. Famous for its resin production.",
    lineage: "Brazilian Sativa x South Indian Indica",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 18.0, thcMax: 25.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "earthy, woody, balanced, hybrid, resin, famous"
  },
  {
    name: "Girl Scout Cookies",
    type: "Hybrid",
    summary: "Sweet hybrid with mint and chocolate flavors. Popular for its euphoric effects.",
    lineage: "OG Kush x Durban Poison",
    terpenes: "Caryophyllene, Limonene, Humulene",
    thcMin: 17.0, thcMax: 28.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "sweet, mint, chocolate, hybrid, euphoric, popular"
  },
  {
    name: "Wedding Cake",
    type: "Hybrid",
    summary: "Sweet hybrid with vanilla and earthy flavors. Known for its relaxing and euphoric effects.",
    lineage: "Triangle Kush x Animal Mints",
    terpenes: "Limonene, Caryophyllene, Linalool",
    thcMin: 20.0, thcMax: 25.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "sweet, vanilla, earthy, hybrid, relaxing, euphoric"
  },

  // High CBD Strains
  {
    name: "Charlotte's Web",
    type: "Sativa",
    summary: "High CBD strain with minimal psychoactive effects. Popular for medical use.",
    lineage: "Unknown",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 0.3, thcMax: 0.5, cbdMin: 17.0, cbdMax: 20.0,
    tags: "high-cbd, medical, therapeutic, sativa, minimal-thc"
  },
  {
    name: "ACDC",
    type: "Hybrid",
    summary: "High CBD strain with minimal psychoactive effects. Popular for pain relief and anxiety.",
    lineage: "Cannatonic x Unknown",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 0.2, thcMax: 0.6, cbdMin: 12.0, cbdMax: 20.0,
    tags: "high-cbd, medical, pain-relief, anxiety, hybrid"
  },
  {
    name: "Harlequin",
    type: "Sativa",
    summary: "High CBD strain with clear-headed effects. Popular for daytime medical use.",
    lineage: "Colombian Gold x Swiss Sativa x Nepali Indica",
    terpenes: "Myrcene, Pinene, Caryophyllene",
    thcMin: 4.0, thcMax: 7.0, cbdMin: 8.0, cbdMax: 12.0,
    tags: "high-cbd, medical, clear-headed, daytime, sativa"
  },

  // Additional Popular Strains
  {
    name: "Gorilla Glue #4",
    type: "Hybrid",
    summary: "Potent hybrid with pine and chocolate flavors. Known for its strong effects and resin production.",
    lineage: "Chem Sister x Sour Dubb x Chocolate Diesel",
    terpenes: "Caryophyllene, Limonene, Humulene",
    thcMin: 20.0, thcMax: 28.0, cbdMin: 0.1, cbdMax: 0.3,
    tags: "pine, chocolate, potent, hybrid, resin, strong"
  },
  {
    name: "Gelato",
    type: "Hybrid",
    summary: "Sweet hybrid with dessert-like flavors. Popular for its balanced effects and beautiful appearance.",
    lineage: "Sunset Sherbet x Thin Mint Girl Scout Cookies",
    terpenes: "Limonene, Caryophyllene, Linalool",
    thcMin: 20.0, thcMax: 25.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "sweet, dessert, balanced, hybrid, beautiful, popular"
  },
  {
    name: "Zkittlez",
    type: "Indica",
    summary: "Fruity indica with tropical flavors. Known for its relaxing effects and sweet aroma.",
    lineage: "Grape Ape x Grapefruit x Unknown",
    terpenes: "Limonene, Myrcene, Caryophyllene",
    thcMin: 15.0, thcMax: 23.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "fruity, tropical, relaxing, indica, sweet, aroma"
  },
  {
    name: "Strawberry Cough",
    type: "Sativa",
    summary: "Sweet sativa with strawberry flavors. Known for its uplifting effects and smooth smoke.",
    lineage: "Strawberry Fields x Haze",
    terpenes: "Limonene, Pinene, Caryophyllene",
    thcMin: 15.0, thcMax: 22.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "strawberry, sweet, uplifting, sativa, smooth, cough"
  },
  {
    name: "Pineapple Express",
    type: "Hybrid",
    summary: "Tropical hybrid with pineapple and citrus flavors. Popular for its energizing effects.",
    lineage: "Trainwreck x Hawaiian",
    terpenes: "Limonene, Pinene, Myrcene",
    thcMin: 16.0, thcMax: 24.0, cbdMin: 0.1, cbdMax: 0.2,
    tags: "pineapple, citrus, tropical, hybrid, energizing, popular"
  }
];

module.exports = comprehensiveStrains;
