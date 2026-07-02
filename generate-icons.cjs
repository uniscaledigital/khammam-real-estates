const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

async function generateIcons() {
  try {
    const logoPath = path.join(__dirname, 'public', 'khammam_realestate_logo.png');
    const image = await Jimp.read(logoPath);
    
    const sizes = [16, 32, 48, 180, 192, 512];
    
    for (const size of sizes) {
      const resized = image.clone().contain(size, size);
      
      const outPath = path.join(__dirname, 'public', `favicon-${size}x${size}.png`);
      await resized.writeAsync(outPath);
      console.log(`Generated ${outPath}`);
    }
    
    // Also generate favicon.ico (just copy 32x32)
    fs.copyFileSync(
      path.join(__dirname, 'public', 'favicon-32x32.png'),
      path.join(__dirname, 'public', 'favicon.ico')
    );
    console.log('Generated favicon.ico');
    
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
