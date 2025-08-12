/**
 * Teilt ein Bild in 9 gleiche Teile auf (3x3 Raster)
 */
export const splitImageIntoParts = (imageSrc: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const partWidth = img.width / 3;
      const partHeight = img.height / 3;
      const parts: string[] = [];
      
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          canvas.width = partWidth;
          canvas.height = partHeight;
          
          ctx.drawImage(
            img,
            col * partWidth, row * partHeight, partWidth, partHeight,
            0, 0, partWidth, partHeight
          );
          
          parts.push(canvas.toDataURL());
        }
      }
      
      resolve(parts);
    };
    
    img.src = imageSrc;
  });
};

/**
 * Mischt ein Array zufällig
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Prüft ob das Puzzle korrekt gelöst ist
 */
export const isPuzzleComplete = (gridState: (string | null)[], correctOrder: string[]): boolean => {
  return gridState.every((cell, index) => cell === correctOrder[index]);
};
