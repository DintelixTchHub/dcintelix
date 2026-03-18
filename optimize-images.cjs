const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assets');
const publicDir = path.join(__dirname, 'public');

const imageFiles = [
  // src/assets
  { dir: assetsDir, file: 'hero.png', maxWidth: 1920, quality: 80 },
  { dir: assetsDir, file: 'pasport.png', maxWidth: 800, quality: 80 },
  { dir: assetsDir, file: 'Gad.png', maxWidth: 800, quality: 80 },
  { dir: assetsDir, file: 'danny.jpeg', maxWidth: 800, quality: 80 },
  { dir: assetsDir, file: 'ecuruza.png', maxWidth: 800, quality: 80 },
  { dir: assetsDir, file: 'logo.png', maxWidth: 400, quality: 80 },
  // public
  { dir: publicDir, file: 'logo.png', maxWidth: 400, quality: 80 },
  { dir: publicDir, file: 'logo1.png', maxWidth: 800, quality: 80 },
];

async function optimizeImage(dir, filename, maxWidth, quality) {
  const filePath = path.join(dir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  const stats = fs.statSync(filePath);
  const originalSize = stats.size;
  
  try {
    const ext = path.extname(filename).toLowerCase();
    let pipeline = sharp(filePath);
    
    // Get metadata
    const metadata = await pipeline.metadata();
    
    // Resize if wider than maxWidth
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Convert to WebP for better compression
    const outputFilename = filename.replace(ext, '.webp');
    const outputPath = path.join(dir, outputFilename);
    
    await pipeline
      .webp({ quality: quality })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ Optimized: ${filename} -> ${outputFilename}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB -> Optimized: ${(newSize / 1024).toFixed(1)} KB (${savings}% smaller)`);
    
    // Also keep original format as backup with compression
    const compressedFilename = filename.replace(ext, '_compressed' + ext);
    const compressedPath = path.join(dir, compressedFilename);
    
    if (ext === '.png') {
      await sharp(filePath)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .png({ quality: quality, compressionLevel: 9 })
        .toFile(compressedPath);
    } else if (ext === '.jpeg' || ext === '.jpg') {
      await sharp(filePath)
        .resize(maxWidth, null, { withoutEnlargement: true })
        .jpeg({ quality: quality })
        .toFile(compressedPath);
    }
    
    const compressedStats = fs.statSync(compressedPath);
    const compressedSavings = ((originalSize - compressedStats.size) / originalSize * 100).toFixed(1);
    
    console.log(`   Compressed: ${filename} -> ${compressedFilename}: ${(compressedStats.size / 1024).toFixed(1)} KB (${compressedSavings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');
  
  for (const img of imageFiles) {
    await optimizeImage(img.dir, img.file, img.maxWidth, img.quality);
  }
  
  console.log('\n✨ Image optimization complete!');
}

main();
