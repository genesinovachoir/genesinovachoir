import smartcrop from 'smartcrop-sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function aiCrop() {
    const inputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar.jpeg');
    const outputPath = path.resolve(__dirname, '../src/assets/raw/abdurrahim-pekacar_cropped.jpeg');
    
    // We want a portrait ratio 3:4 or essentially waist-up.
    // If the container is 240x360, it's 2:3 ratio. 
    // Wait, let's ask for 1000 x 1500 box (2:3).
    
    console.log("Analyzing image with SmartCrop...");
    const result = await smartcrop.crop(inputPath, { width: 1000, height: 1500 });
    const crop = result.topCrop;
    
    console.log("SmartCrop found optimal crop box:", crop);

    // Now extract that exactly
    import('sharp').then(async ({ default: sharp }) => {
        await sharp(inputPath)
            .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
            .toFile(outputPath);
            
        fs.renameSync(outputPath, inputPath);
        console.log("AI Crop successful");
    });
}

aiCrop().catch(console.error);
