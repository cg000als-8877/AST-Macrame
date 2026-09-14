import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';

const imagesToProcess = [
  { in: 'src/assets/products/Black/1.webp', out: 'src/assets/products/Black/1_clean.png' },
  { in: 'src/assets/products/Navy/1.webp', out: 'src/assets/products/Navy/1_clean.png' },
  { in: 'src/assets/products/Brown/1.webp', out: 'src/assets/products/Brown/1_clean.png' },
  { in: 'src/assets/products/Maroon/1.webp', out: 'src/assets/products/Maroon/1_clean.png' },
  { in: 'src/assets/products/Khaki/1.webp', out: 'src/assets/products/Khaki/1_clean.png' },
  { in: 'public/AST Macrame Kids/Neon Green/1.webp', out: 'public/AST Macrame Kids/Neon Green/1_clean.png' },
  { in: 'public/AST Macrame Kids/Navy/1.webp', out: 'public/AST Macrame Kids/Navy/1_clean.png' },
  { in: 'public/AST Macrame Kids/Red/1.webp', out: 'public/AST Macrame Kids/Red/1_clean.png' },
  { in: 'public/AST Macrame Kids/Black/1.webp', out: 'public/AST Macrame Kids/Black/1_clean.png' }
];

async function processImage(item) {
  const inputPath = path.resolve(item.in);
  const outputPath = path.resolve(item.out);
  
  if (!fs.existsSync(inputPath)) {
    console.warn('File not found:', inputPath);
    return;
  }
  
  console.log('Processing:', item.in, '->', item.out);
  const buffer = fs.readFileSync(inputPath);
  const blob = new Blob([buffer], { type: 'image/webp' });
  
  const resultBlob = await removeBackground(blob, {
    output: { format: 'image/png', quality: 0.95 }
  });
  const arrayBuffer = await resultBlob.arrayBuffer();
  const outputBuffer = Buffer.from(arrayBuffer);
  
  fs.writeFileSync(outputPath, outputBuffer);
  console.log('Successfully saved:', item.out);
}

async function run() {
  for (const item of imagesToProcess) {
    try {
      await processImage(item);
    } catch (err) {
      console.error('Error processing', item.in, err);
    }
  }
  console.log('All gallery display images processed successfully!');
}

run();
