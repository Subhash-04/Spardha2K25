const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('Starting image optimization with Sharp...');
  
  const assetsDir = './src/assets';
  const optimizedDir = './src/assets/optimized';
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  // Get PNG files to optimize
  const pngFiles = ['4.png', '6.png', '8.png'];
  
  console.log('Original file sizes:');
  for (const file of pngFiles) {
    const inputPath = path.join(assetsDir, file);
    if (fs.existsSync(inputPath)) {
      const stats = fs.statSync(inputPath);
      console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    }
  }
  
  console.log('\nOptimizing images...');
  
  for (const file of pngFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(optimizedDir, file);
    
    if (fs.existsSync(inputPath)) {
      try {
        await sharp(inputPath)
          .png({ 
            quality: 70,
            compressionLevel: 9,
            progressive: true
          })
          .toFile(outputPath);
        
        const originalStats = fs.statSync(inputPath);
        const optimizedStats = fs.statSync(outputPath);
        const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
        
        console.log(`✓ ${file}: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB → ${(optimizedStats.size / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)`);
      } catch (error) {
        console.error(`✗ Error optimizing ${file}:`, error.message);
      }
    }
  }
  
  // Also optimize any JPG files
  const jpgFiles = fs.readdirSync(assetsDir).filter(file => 
    file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')
  );
  
  for (const file of jpgFiles) {
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(optimizedDir, file);
    
    try {
      await sharp(inputPath)
        .jpeg({ 
          quality: 75,
          progressive: true
        })
        .toFile(outputPath);
      
      const originalStats = fs.statSync(inputPath);
      const optimizedStats = fs.statSync(outputPath);
      const reduction = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
      
      console.log(`✓ ${file}: ${(originalStats.size / 1024 / 1024).toFixed(2)} MB → ${(optimizedStats.size / 1024 / 1024).toFixed(2)} MB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('\n🎉 Image optimization completed!');
  console.log('📁 Check the src/assets/optimized folder for optimized images.');
  console.log('💡 Replace the original files with optimized ones if satisfied with quality.');
}

optimizeImages().catch(console.error);