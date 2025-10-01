#!/usr/bin/env node

/**
 * Language API Population Script
 * Populates the language API with extracted content from static pages
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read extracted language content
const languageContentPath = path.join(__dirname, '..', 'client', 'src', 'data', 'language-content.json');
const languageContent = JSON.parse(fs.readFileSync(languageContentPath, 'utf8'));

/**
 * Populate language content in the database
 */
async function populateLanguageAPI() {
  console.log('🌍 Starting language API population...\n');
  
  const baseUrl = 'http://localhost:3000'; // Adjust if needed
  
  for (const [langCode, content] of Object.entries(languageContent)) {
    console.log(`📝 Populating content for ${langCode}...`);
    
    try {
      // Send content to API
      const response = await fetch(`${baseUrl}/api/language/${langCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content)
      });
      
      if (response.ok) {
        console.log(`✅ Successfully populated ${langCode} content`);
      } else {
        console.log(`❌ Failed to populate ${langCode} content: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Error populating ${langCode} content:`, error.message);
    }
  }
  
  console.log('\n🎉 Language API population completed!');
}

/**
 * Create language content files for static serving
 */
function createLanguageFiles() {
  console.log('📁 Creating language content files...\n');
  
  const outputDir = path.join(__dirname, '..', 'client', 'public', 'api', 'language');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const [langCode, content] of Object.entries(languageContent)) {
    const filePath = path.join(outputDir, `${langCode}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Created ${filePath}`);
  }
  
  // Create index file with all languages
  const indexContent = {
    languages: Object.keys(languageContent),
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'index.json'), 
    JSON.stringify(indexContent, null, 2)
  );
  
  console.log('✅ Created language index file');
}

/**
 * Update server storage with language content
 */
function updateServerStorage() {
  console.log('💾 Updating server storage...\n');
  
  const storagePath = path.join(__dirname, '..', 'server', 'storage.ts');
  let storageContent = fs.readFileSync(storagePath, 'utf8');
  
  // Add language content initialization
  const languageInitCode = `
  // Initialize language content
  private initializeLanguageContent() {
    const languageContent = ${JSON.stringify(languageContent, null, 4)};
    
    for (const [langCode, content] of Object.entries(languageContent)) {
      this.setLanguageContent(langCode, 'full', content);
    }
  }
  `;
  
  // Find the initializeSampleData method and add language content initialization
  const initMethodRegex = /private initializeSampleData\(\) \{[\s\S]*?\}/;
  const initMethod = storageContent.match(initMethodRegex);
  
  if (initMethod) {
    // Add language content initialization after the existing method
    storageContent = storageContent.replace(
      /private initializeSampleData\(\) \{[\s\S]*?\}/,
      `private initializeSampleData() {
    // Sample reports
    const sampleReports = [
      {
        id: randomUUID(),
        title: "Annual Report 2023",
        category: "annual",
        filePath: "/reports/annual-2023.pdf",
        fileSize: "2.5 MB",
        publishDate: new Date("2024-03-15"),
        downloadCount: "156"
      },
      {
        id: randomUUID(),
        title: "Q3 2024 Performance Update",
        category: "quarterly",
        filePath: "/reports/q3-2024.pdf",
        fileSize: "1.2 MB",
        publishDate: new Date("2024-10-15"),
        downloadCount: "89"
      },
      {
        id: randomUUID(),
        title: "Sustainability Report 2023",
        category: "sustainability",
        filePath: "/reports/sustainability-2023.pdf",
        fileSize: "3.2 MB",
        publishDate: new Date("2024-06-01"),
        downloadCount: "234"
      }
    ];
    
    sampleReports.forEach(report => {
      this.reports.set(report.id, report);
    });
    
    // Initialize language content
    this.initializeLanguageContent();
  }`
    );
    
    // Add the language content initialization method
    storageContent += languageInitCode;
    
    fs.writeFileSync(storagePath, storageContent);
    console.log('✅ Updated server storage with language content');
  }
}

// Main execution
async function main() {
  try {
    // Create language files for static serving
    createLanguageFiles();
    
    // Update server storage
    updateServerStorage();
    
    // Try to populate API (optional, requires server to be running)
    try {
      await populateLanguageAPI();
    } catch (error) {
      console.log('⚠️  Could not populate API (server may not be running):', error.message);
    }
    
    console.log('\n🎉 Language API population completed successfully!');
  } catch (error) {
    console.error('❌ Error during language API population:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { populateLanguageAPI, createLanguageFiles, updateServerStorage };
