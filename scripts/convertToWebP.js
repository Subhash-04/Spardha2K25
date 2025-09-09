const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  // Source directory containing original images
  sourceDir: path.join(__dirname, '../src/assets/images'),
  
  // Output directory for WebP images
  outputDir: path.join(__dirname, '../src/assets/images/webp'),
  
  // Quality of WebP images (1-100)
  quality: 80,
  
  // Generate responsive sizes
  responsive: true,
  
  // Responsive widths to generate
  responsiveSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  
  // File extensions to process
  extensions: ['.jpg', '.jpeg', '.png']
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
  console.log(`Created output directory: ${config.outputDir}`);
}

/**
 * Convert a single image to WebP format
 * @param {string} filePath - Path to the original image
 * @param {number} quality - WebP quality (1-100)
 * @param {number|null} width - Target width (null for original size)
 * @returns {Promise<string>} - Path to the converted WebP image
 */
async function convertToWebP(filePath, quality, width = null) {
  const fileName = path.basename(filePath);
  const fileNameWithoutExt = path.parse(fileName).name;
  
  // Determine output filename
  let outputFileName;
  if (width) {
    outputFileName = `${fileNameWithoutExt}-${width}w.webp`;
  } else {
    outputFileName = `${fileNameWithoutExt}.webp`;
  }
  
  const outputPath = path.join(config.outputDir, outputFileName);
  
  try {
    // Create Sharp instance
    let sharpInstance = sharp(filePath);
    
    // Resize if width is specified
    if (width) {
      sharpInstance = sharpInstance.resize(width);
    }
    
    // Convert to WebP and save
    await sharpInstance
      .webp({ quality })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    throw error;
  }
}

/**
 * Process all images in the source directory
 */
async function processImages() {
  try {
    // Get all files in the source directory
    const files = fs.readdirSync(config.sourceDir);
    
    // Filter for image files
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return config.extensions.includes(ext);
    });
    
    console.log(`Found ${imageFiles.length} images to convert`);
    
    // Process each image
    for (const file of imageFiles) {
      const filePath = path.join(config.sourceDir, file);
      const fileNameWithoutExt = path.parse(file).name;
      
      console.log(`Processing ${file}...`);
      
      // Convert original size
      const webpPath = await convertToWebP(filePath, config.quality);
      console.log(`  Created ${path.basename(webpPath)}`);
      
      // Generate responsive sizes if enabled
      if (config.responsive) {
        for (const width of config.responsiveSizes) {
          const responsiveWebpPath = await convertToWebP(filePath, config.quality, width);
          console.log(`  Created ${path.basename(responsiveWebpPath)}`);
        }
      }
    }
    
    console.log('\nConversion complete!');
    console.log(`Converted ${imageFiles.length} images to WebP format`);
    console.log(`Output directory: ${config.outputDir}`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

// Run the conversion process
processImages();