const fs = require('fs');
const path = require('path');

// Read the SQL file
const sqlFile = path.join(__dirname, '..', 'weed-wiki-database.sql');
const sqlContent = fs.readFileSync(sqlFile, 'utf8');

// Extract all strain INSERT statements
const strainRegex = /INSERT INTO "Strain" \([^)]+\) VALUES \(([^;]+)\);/g;
const strains = [];
let match;

while ((match = strainRegex.exec(sqlContent)) !== null) {
  const values = match[1];
  
  // Parse the VALUES string more carefully
  // The format is: 'id', 'name', 'type', 'summary', 'lineage', thcMin, thcMax, cbdMin, cbdMax, 'terpenes', 'tags', 'createdAt', 'updatedAt'
  
  // Split by comma but be careful with quoted strings
  const parts = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';
  
  for (let i = 0; i < values.length; i++) {
    const char = values[i];
    
    if ((char === "'" || char === '"') && !inQuotes) {
      inQuotes = true;
      quoteChar = char;
      current += char;
    } else if (char === quoteChar && inQuotes) {
      inQuotes = false;
      quoteChar = '';
      current += char;
    } else if (char === ',' && !inQuotes) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current.trim()) {
    parts.push(current.trim());
  }
  
  if (parts.length >= 11) {
    const id = parts[0].replace(/'/g, '');
    const name = parts[1].replace(/'/g, '');
    const type = parts[2].replace(/'/g, '');
    const summary = parts[3].replace(/'/g, '');
    const lineage = parts[4].replace(/'/g, '');
    const thcMin = parseFloat(parts[5]) || 0;
    const thcMax = parseFloat(parts[6]) || 0;
    const cbdMin = parseFloat(parts[7]) || 0;
    const cbdMax = parseFloat(parts[8]) || 0;
    const terpenes = parts[9].replace(/'/g, '');
    const tags = parts[10].replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '');
    
    strains.push({
      name,
      type,
      summary,
      lineage,
      thcMin,
      thcMax,
      cbdMin,
      cbdMax,
      terpenes,
      tags
    });
  }
}

console.log(`Extracted ${strains.length} strains from SQL file`);

// Write to a JSON file
const outputFile = path.join(__dirname, 'all-strains.json');
fs.writeFileSync(outputFile, JSON.stringify(strains, null, 2));

console.log(`Strains saved to ${outputFile}`);

// Also create a JavaScript module
const jsOutput = `// All ${strains.length} strains extracted from SQL database
const allStrains = ${JSON.stringify(strains, null, 2)};

module.exports = allStrains;
`;

const jsOutputFile = path.join(__dirname, 'all-strains.js');
fs.writeFileSync(jsOutputFile, jsOutput);

console.log(`JavaScript module saved to ${jsOutputFile}`);

// Show first few strains as sample
console.log('\nFirst 5 strains:');
strains.slice(0, 5).forEach((strain, i) => {
  console.log(`${i + 1}. ${strain.name} (${strain.type}) - ${strain.summary.substring(0, 50)}...`);
});