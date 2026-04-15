import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function hardcoreCrop() {
    const inputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar.jpeg');
    const outputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar_cropped.jpeg');
    
    // Exact crop coordinates targeting hair to waist, centered horizontally.
    const cropBox = {
        left: 150,
        top: 250,
        width: 1200,
        height: 1800
    };

    console.log("Applying hardcore waist-crop...", cropBox);

    await sharp(inputPath)
        .extract(cropBox)
        .toFile(outputPath);
        
    fs.renameSync(outputPath, inputPath);
    console.log("Crop successful");
}

hardcoreCrop().catch(console.error);
