import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropConductor() {
    const inputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar.jpeg');
    const outputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar_cropped.jpeg');
    
    // Read the image dimensions
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    const width = metadata.width;
    const originalHeight = metadata.height;
    
    // We want to crop from top down to waist. A 4:5 or 1:1 ratio is good to cut off the legs.
    // Let's create a 4:5 ratio portrait crop (e.g., width x width * 1.25)
    // 1707 * 1.25 = 2133
    const newHeight = Math.floor(width * 1.25);
    
    const cropHeight = Math.min(newHeight, originalHeight);

    console.log(`Original: ${width}x${originalHeight}`);
    console.log(`Cropping to: ${width}x${cropHeight} (keeping top)`);
    
    await image
        .extract({ left: 0, top: 0, width: width, height: cropHeight })
        .toFile(outputPath);
        
    // Replace original
    fs.renameSync(outputPath, inputPath);
    console.log("Crop successful");
}

cropConductor().catch(console.error);
