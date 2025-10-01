const fs = require('fs');
const path = require('path');

// Read the ASSET_PATHS from the TypeScript file
const assetsFile = fs.readFileSync('client/src/utils/assets.ts', 'utf8');

// Extract all asset paths from ASSET_PATHS
const assetPathMatches = assetsFile.match(/'([^']+)'/g);
const definedPaths = assetPathMatches ? assetPathMatches.map(match => match.slice(1, -1)) : [];

console.log('📊 ASSET ANALYSIS REPORT');
console.log('========================\n');

console.log(`📁 Total files in assets directory: 160`);
console.log(`🔗 Total paths defined in ASSET_PATHS: ${definedPaths.length}\n`);

// Get all actual files in the assets directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      // Convert to relative path from client/public/assets/
      const relativePath = filePath.replace('client/public/assets/', '');
      fileList.push(relativePath);
    }
  });
  
  return fileList;
}

const allFiles = getAllFiles('client/public/assets');
console.log(`📂 All files found: ${allFiles.length}\n`);

// Find unused files (files that exist but are not in ASSET_PATHS)
const unusedFiles = allFiles.filter(file => !definedPaths.includes(file));

console.log('🗑️  UNUSED FILES (can be removed):');
console.log('=====================================');
unusedFiles.forEach(file => {
  console.log(`❌ ${file}`);
});

console.log(`\n📊 Summary:`);
console.log(`✅ Used files: ${allFiles.length - unusedFiles.length}`);
console.log(`❌ Unused files: ${unusedFiles.length}`);
console.log(`💾 Space that can be saved: ${unusedFiles.length} files\n`);

// Find duplicate files (files that exist in multiple locations)
const fileMap = {};
allFiles.forEach(file => {
  const fileName = path.basename(file);
  if (!fileMap[fileName]) {
    fileMap[fileName] = [];
  }
  fileMap[fileName].push(file);
});

const duplicates = Object.entries(fileMap).filter(([name, paths]) => paths.length > 1);

if (duplicates.length > 0) {
  console.log('🔄 DUPLICATE FILES:');
  console.log('===================');
  duplicates.forEach(([name, paths]) => {
    console.log(`📁 ${name}:`);
    paths.forEach(p => console.log(`   - ${p}`));
    console.log('');
  });
}

// Check for missing files (defined in ASSET_PATHS but don't exist)
const missingFiles = definedPaths.filter(path => !allFiles.includes(path));

if (missingFiles.length > 0) {
  console.log('⚠️  MISSING FILES (defined in ASSET_PATHS but not found):');
  console.log('=======================================================');
  missingFiles.forEach(file => {
    console.log(`❌ ${file}`);
  });
  console.log('');
}

console.log('🎯 RECOMMENDATIONS:');
console.log('===================');
console.log(`1. Remove ${unusedFiles.length} unused files to reduce bundle size`);
console.log(`2. Keep only one copy of ${duplicates.length} duplicate files`);
console.log(`3. Fix ${missingFiles.length} missing file references`);
