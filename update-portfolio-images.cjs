const fs = require('fs');

// Read the PortfolioSection.tsx file
const filePath = 'client/src/components/PortfolioSection.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Image mappings for portfolio projects
const imageMappings = {
  'shipping_containers__4ae963ed.jpg': 'STOCK.SHIPPING_CONTAINERS',
  'heavy_machinery_port_83342e21.jpg': 'STOCK.PORT_CRANE', // Using port crane as fallback
  'port_crane_operation_01b3e60a.jpg': 'STOCK.PORT_CRANE',
  'maritime_logistics_w_d9957c6e.jpg': 'STOCK.PORT_OPERATIONS', // Using port operations as fallback
  'shipping_port_cargo__47da743f.jpg': 'STOCK.SHIPPING_PORT',
  'warehouse_logistics__98d4995a.jpg': 'STOCK.PORT_OPERATIONS', // Using port operations as fallback
  'port_crane_operation_7be1f647.jpg': 'STOCK.PORT_CRANE',
  'maritime_logistics_w_fe0e3edc.jpg': 'STOCK.PORT_OPERATIONS', // Using port operations as fallback
  'business_professiona_7819dff4.jpg': 'STOCK.PORT_OPERATIONS', // Using port operations as fallback
  'ghana_port_infrastru_7ef9101d.jpg': 'STOCK.GHANA_PORT',
  'warehouse_logistics__b8d9236e.jpg': 'STOCK.PORT_OPERATIONS' // Using port operations as fallback
};

// Update portfolio image paths
Object.entries(imageMappings).forEach(([filename, constantName]) => {
  const oldPath = `"/attached_assets/stock_images/${filename}"`;
  const newPath = `getAssetUrl(ASSET_PATHS.${constantName})`;
  
  content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content);
console.log('Portfolio image paths updated successfully!');
