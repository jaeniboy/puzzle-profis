import type { PuzzleImage } from '../types'

// Diese Datei wird automatisch generiert von scripts/generate-images.js
// Fügen Sie einfach neue Bilder zu public/example-images hinzu und führen Sie 'npm run generate-images' aus

// Explizite Imports damit Vite die Bilder als Assets erkennt
import img1 from '/example-images/20-500x500.jpg?url';
import img2 from '/example-images/237-500x500.jpg?url';
import img3 from '/example-images/40-500x500.jpg?url';
import img4 from '/example-images/49-500x500.jpg?url';
import img5 from '/example-images/76-500x500.jpg?url';
import img6 from '/example-images/Bee.png?url';
import img7 from '/example-images/Butterfly.png?url';
import img8 from '/example-images/Lemon.png?url';
import img9 from '/example-images/Owl.png?url';
import img10 from '/example-images/Penguin.png?url';
import img11 from '/example-images/Raspberries.png?url';
import img12 from '/example-images/Turtle.png?url';

// Gefundene Bilddateien: 20-500x500.jpg, 237-500x500.jpg, 40-500x500.jpg, 49-500x500.jpg, 76-500x500.jpg, Bee.png, Butterfly.png, Lemon.png, Owl.png, Penguin.png, Raspberries.png, Turtle.png
const imageAssets: string[] = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12
];

// Generiere PuzzleImage Array
export const sampleImages: PuzzleImage[] = imageAssets.map((src, index) => ({
  id: (index + 1).toString(),
  name: `Puzzle ${index + 1}`, // Name wird im UI nicht mehr verwendet
  src: src,
  alt: 'ein puzzle motiv'
}));
