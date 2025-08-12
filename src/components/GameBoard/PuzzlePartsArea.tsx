import React from 'react';

interface PuzzlePartsAreaProps {
  parts: (string | null)[];
  onDragStart: (event: React.DragEvent<HTMLDivElement>, partIndex: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>, partIndex: number) => void;
  onTouchMove?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
}

const PuzzlePartsArea = ({ 
  parts, 
  onDragStart, 
  onDrop, 
  onTouchStart, 
  onTouchMove, 
  onTouchEnd 
}: PuzzlePartsAreaProps) => {
  
  // Event-Handler für Touch-Drops
  const handleTouchDropParts = (event: Event) => {
    const customEvent = event as CustomEvent;
    onDrop(customEvent.detail.event);
  };

  return (
    <div 
      className="bg-gray-100 p-4 rounded-lg shadow-lg"
      data-drop-target="true"
      data-drop-type="parts"
      onDrop={onDrop}
      onDragOver={(event) => event.preventDefault()}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      ref={(el) => {
        if (el) {
          el.addEventListener('touchDropParts', handleTouchDropParts);
        }
      }}
    >
      <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {parts.map((part, index) => (
          <div
            key={`part-${index}-${part ? part.substring(0, 20) : 'empty'}`}
            className={`border-2 bg-white h-24 w-24 flex items-center justify-center transition-all shadow-md ${
              part 
                ? 'border-gray-400 cursor-grab active:cursor-grabbing hover:border-primary-400 hover:scale-105 touch-manipulation' 
                : 'border-dashed border-gray-300 bg-gray-50'
            }`}
            draggable={!!part}
            data-testid={`puzzle-part-${index}`}
            onDragStart={part ? (event) => onDragStart(event, index) : undefined}
            onTouchStart={part && onTouchStart ? (event) => onTouchStart(event, index) : undefined}
            style={{ minHeight: '96px', minWidth: '96px' }}
          >
            {part ? (
              <img 
                src={part} 
                alt={`Puzzle part ${index}`} 
                className="h-full w-full object-cover rounded"
                draggable={false}
              />
            ) : (
              <div className="text-gray-400 text-xs text-center">
                Leer
              </div>
            )}
          </div>
        ))}
      </div>
      
      {parts.every(part => part === null) && (
        <div className="text-center py-8 text-gray-500">
          <p className="font-family-[Comic_Sans_MS,cursive,sans-serif]">
            Alle Teile wurden platziert! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default PuzzlePartsArea;
