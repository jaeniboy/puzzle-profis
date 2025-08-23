import type { PuzzleImage } from '../types'

// Diese Datei wird automatisch generiert von scripts/generate-images.js
// Fügen Sie einfach neue Bilder zu public/example-images hinzu und führen Sie 'npm run generate-images' aus

// Explizite Imports damit Vite die Bilder als Assets erkennt
import img1 from '/example-images/Bee.png?url';
import img2 from '/example-images/Butterfly.png?url';
import img3 from '/example-images/Drache-sm.png?url';
import img4 from '/example-images/Einhorn-sm.png?url';
import img5 from '/example-images/Kronkorken-sm.png?url';
import img6 from '/example-images/Lemon.png?url';
import img7 from '/example-images/Mond-sm.png?url';
import img8 from '/example-images/Owl.png?url';
import img9 from '/example-images/Papa-sm.png?url';
import img10 from '/example-images/Penguin.png?url';
import img11 from '/example-images/Pirat-sm.png?url';
import img12 from '/example-images/Raspberries.png?url';
import img13 from '/example-images/Sanitaeterin-sm.png?url';
import img14 from '/example-images/Schwimmen-sm.png?url';
import img15 from '/example-images/Torte-sm.png?url';
import img16 from '/example-images/Turtle.png?url';
import img17 from '/example-images/Wiese-sm.png?url';
import img18 from '/example-images/Wissenschaftlerin-sm.png?url';

// Gefundene Bilddateien: Bee.png, Butterfly.png, Drache-sm.png, Einhorn-sm.png, Kronkorken-sm.png, Lemon.png, Mond-sm.png, Owl.png, Papa-sm.png, Penguin.png, Pirat-sm.png, Raspberries.png, Sanitaeterin-sm.png, Schwimmen-sm.png, Torte-sm.png, Turtle.png, Wiese-sm.png, Wissenschaftlerin-sm.png
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
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18
];

// Generiere PuzzleImage Array
export const sampleImages: PuzzleImage[] = imageAssets.map((src, index) => ({
  id: (index + 1).toString(),
  name: `Puzzle ${index + 1}`, // Name wird im UI nicht mehr verwendet
  src: src,
  alt: 'ein puzzle motiv'
}));
