import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pfad zum example-images Verzeichnis
const imagesDir = path.join(__dirname, '../public/example-images');
const outputFile = path.join(__dirname, '../src/data/images.ts');

// Unterstützte Bildformate
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function generateImagesFile() {
  try {
    // Lese alle Dateien im Verzeichnis
    const files = fs.readdirSync(imagesDir);
    
    // Filtere nur Bilddateien und sortiere sie
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return supportedExtensions.includes(ext);
      })
      .sort(); // Alphabetische Sortierung für Konsistenz

    console.log(`Found ${imageFiles.length} image files:`, imageFiles);

    // Generiere TypeScript Code mit expliziten Imports
    const imports = imageFiles.map((file, index) => 
      `import img${index + 1} from '/example-images/${file}?url';`
    ).join('\n');

    const tsContent = `import type { PuzzleImage } from '../types'

// Diese Datei wird automatisch generiert von scripts/generate-images.js
// Fügen Sie einfach neue Bilder zu public/example-images hinzu und führen Sie 'npm run generate-images' aus

// Explizite Imports damit Vite die Bilder als Assets erkennt
${imports}

// Gefundene Bilddateien: ${imageFiles.join(', ')}
const imageAssets: string[] = [
${imageFiles.map((file, index) => `  img${index + 1}`).join(',\n')}
];

// Generiere PuzzleImage Array
export const sampleImages: PuzzleImage[] = imageAssets.map((src, index) => ({
  id: (index + 1).toString(),
  name: \`Puzzle \${index + 1}\`, // Name wird im UI nicht mehr verwendet
  src: src,
  alt: 'ein puzzle motiv'
}));
`;

    // Schreibe die generierte Datei
    fs.writeFileSync(outputFile, tsContent, 'utf8');
    console.log(`Successfully generated ${outputFile} with ${imageFiles.length} images`);

  } catch (error) {
    console.error('Error generating images file:', error);
    process.exit(1);
  }
}

// Führe die Generierung aus
generateImagesFile();
