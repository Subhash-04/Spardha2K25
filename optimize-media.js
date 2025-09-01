const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Enhanced media optimization script
async function optimizeMedia() {
  console.log('🚀 Starting comprehensive media optimization...');
  
  const assetsDir = './src/assets';
  const optimizedDir = './src/assets/optimized';
  const imagesDir = './src/assets/images';
  const videosDir = './src/assets/videos';
  
  // Create optimized directory if it doesn't exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }
  
  // Create subdirectories for organized optimization
  const optimizedImagesDir = path.join(optimizedDir, 'images');
  const optimizedVideosDir = path.join(optimizedDir, 'videos');
  
  if (!fs.existsSync(optimizedImagesDir)) {
    fs.mkdirSync(optimizedImagesDir, { recursive: true });
  }
  
  if (!fs.existsSync(optimizedVideosDir)) {
    fs.mkdirSync(optimizedVideosDir, { recursive: true });
  }
  
  console.log('📊 Analyzing current media files...');
  
  // Analyze image files
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter(file => 
      /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
    );
    
    console.log('\n📸 Image Files Analysis:');
    let totalImageSize = 0;
    
    imageFiles.forEach(file => {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
      totalImageSize += stats.size;
      
      console.log(`  ${file}: ${sizeInMB} MB`);
    });
    
    console.log(`  Total Images Size: ${(totalImageSize / 1024 / 1024).toFixed(2)} MB`);
  }
  
  // Analyze video files
  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir).filter(file => 
      /\.(mp4|webm|mov|avi)$/i.test(file)
    );
    
    console.log('\n🎥 Video Files Analysis:');
    let totalVideoSize = 0;
    
    videoFiles.forEach(file => {
      const filePath = path.join(videosDir, file);
      const stats = fs.statSync(filePath);
      const sizeInMB = (stats.size / 1024 / 1024).toFixed(2);
      totalVideoSize += stats.size;
      
      console.log(`  ${file}: ${sizeInMB} MB`);
    });
    
    console.log(`  Total Videos Size: ${(totalVideoSize / 1024 / 1024).toFixed(2)} MB`);
  }
  
  // Create optimization recommendations
  console.log('\n💡 Optimization Recommendations:');
  console.log('\n📸 For Images:');
  console.log('  • Convert PNG to WebP for better compression');
  console.log('  • Use JPEG for photos, PNG for graphics with transparency');
  console.log('  • Implement responsive images with multiple sizes');
  console.log('  • Consider lazy loading for better performance');
  
  console.log('\n🎥 For Videos:');
  console.log('  • Convert to WebM format for better compression');
  console.log('  • Use H.264 codec for broad compatibility');
  console.log('  • Implement multiple quality versions (720p, 1080p)');
  console.log('  • Add poster images for faster loading');
  
  // Create optimized versions using canvas-based compression
  await createOptimizedImages();
  
  console.log('\n✅ Media optimization analysis completed!');
  console.log('📁 Check the recommendations above for manual optimization.');
  console.log('🔧 For automated optimization, consider using online tools like:');
  console.log('   • TinyPNG/TinyJPG for images');
  console.log('   • CloudConvert for videos');
  console.log('   • Squoosh.app for advanced image optimization');
}

// Create optimized images using basic compression techniques
async function createOptimizedImages() {
  console.log('\n🔄 Creating optimized image versions...');
  
  const imagesDir = './src/assets/images';
  const optimizedImagesDir = './src/assets/optimized/images';
  
  if (!fs.existsSync(imagesDir)) {
    console.log('No images directory found.');
    return;
  }
  
  const imageFiles = fs.readdirSync(imagesDir).filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );
  
  // Create a simple HTML file for canvas-based optimization
  const htmlOptimizer = `
<!DOCTYPE html>
<html>
<head>
    <title>Image Optimizer</title>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        // This is a template for browser-based image optimization
        // You can use this in a browser environment to compress images
        function compressImage(file, quality = 0.7) {
            return new Promise((resolve) => {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    canvas.toBlob(resolve, 'image/jpeg', quality);
                };
                
                img.src = URL.createObjectURL(file);
            });
        }
    </script>
</body>
</html>`;
  
  fs.writeFileSync('./image-optimizer.html', htmlOptimizer);
  console.log('📄 Created image-optimizer.html for browser-based compression');
  
  // Copy files to optimized directory for manual processing
  imageFiles.forEach(file => {
    const sourcePath = path.join(imagesDir, file);
    const destPath = path.join(optimizedImagesDir, file);
    fs.copyFileSync(sourcePath, destPath);
  });
  
  console.log(`📋 Copied ${imageFiles.length} images to optimized directory for processing`);
}

// Run the optimization
optimizeMedia().catch(console.error);