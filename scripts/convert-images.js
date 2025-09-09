/**
 * Image Conversion Script
 * 
 * This script converts all JPG and PNG images in the public directory to WebP format
 * and generates responsive image versions for different screen sizes.
 * 
 * Usage: node scripts/convert-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  // Source directories to scan for images
  sourceDirs: ['public/images', 'src/assets'],
  // Responsive widths to generate
  responsiveWidths: [640, 768, 1024, 1280, 1536],
  // Quality setting for WebP (0-100)
  webpQuality: 80,
  // Quality setting for JPEG (0-100)
  jpegQuality: 85,
  // Extensions to process
  extensions: ['.jpg', '.jpeg', '.png']
};

// Statistics tracking
let stats = {
  processed: 0,
  webpConverted: 0,
  responsiveGenerated: 0,
  originalSize: 0,
  optimizedSize: 0
};

/**
 * Process a single image file
 * @param {string} filePath Path to the image file
 */
async function processImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (!config.extensions.includes(ext)) return;
    
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, ext);
    const originalSize = fs.statSync(filePath).size;
    stats.originalSize += originalSize;
    
    console.log(`Processing: ${filePath}`);
    
    // Load the image
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Convert to WebP
    const webpPath = path.join(dir, `${baseName}.webp`);
    await image
      .webp({ quality: config.webpQuality })
      .toFile(webpPath);
    
    const webpSize = fs.statSync(webpPath).size;
    stats.webpConverted++;
    stats.optimizedSize += webpSize;
    
    // Generate responsive versions
    for (const width of config.responsiveWidths) {
      // Skip if the requested width is larger than the original
      if (width >= metadata.width) continue;
      
      // Calculate height to maintain aspect ratio
      const height = Math.round(metadata.height * (width / metadata.width));
      
      // Generate responsive JPG/PNG (same format as original)
      const responsivePath = path.join(dir, `${baseName}-${width}${ext}`);
      await sharp(filePath)
        .resize(width, height)
        .toFile(responsivePath);
      
      // Generate responsive WebP
      const responsiveWebpPath = path.join(dir, `${baseName}-${width}.webp`);
      await sharp(filePath)
        .resize(width, height)
        .webp({ quality: config.webpQuality })
        .toFile(responsiveWebpPath);
      
      stats.responsiveGenerated += 2; // Count both formats
    }
    
    stats.processed++;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

/**
 * Recursively scan directories for image files
 * @param {string} dir Directory to scan
 * @returns {string[]} Array of image file paths
 */
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }
  
  let results = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      results = results.concat(scanDirectory(itemPath));
    } else if (stat.isFile()) {
      const ext = path.extname(itemPath).toLowerCase();
      if (config.extensions.includes(ext)) {
        results.push(itemPath);
      }
    }
  }
  
  return results;
}

/**
 * Format bytes to human-readable size
 * @param {number} bytes Size in bytes
 * @returns {string} Formatted size string
 */
function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

/**
 * Main function
 */
async function main() {
  console.log('Starting image conversion and optimization...');
  
  // Scan all source directories for images
  let imagePaths = [];
  for (const dir of config.sourceDirs) {
    imagePaths = imagePaths.concat(scanDirectory(dir));
  }
  
  console.log(`Found ${imagePaths.length} images to process`);
  
  // Process each image
  for (const imagePath of imagePaths) {
    await processImage(imagePath);
  }
  
  // Print statistics
  console.log('\nConversion complete!');
  console.log(`Processed: ${stats.processed} images`);
  console.log(`WebP conversions: ${stats.webpConverted}`);
  console.log(`Responsive versions: ${stats.responsiveGenerated}`);
  console.log(`Original size: ${formatSize(stats.originalSize)}`);
  console.log(`Optimized size: ${formatSize(stats.optimizedSize)}`);
  console.log(`Size reduction: ${formatSize(stats.originalSize - stats.optimizedSize)} (${Math.round((1 - stats.optimizedSize / stats.originalSize) * 100)}%)`);
}

// Run the script
main().catch(console.error);