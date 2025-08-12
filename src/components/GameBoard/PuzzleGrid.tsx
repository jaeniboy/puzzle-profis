import React from 'react';

interface PuzzleGridProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  gridState: (string | null)[];
  onCellClick: (index: number) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onTouchStart?: (event: React.TouchEvent<HTMLDivElement>, index: number) => void;
  onTouchMove?: (event: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLDivElement>) => void;
}

const PuzzleGrid = ({ 
  onDrop, 
  gridState, 
  onCellClick, 
  onDragStart, 
  onTouchStart, 
  onTouchMove, 
  onTouchEnd 
}: PuzzleGridProps) => {
  
  // Event-Handler für Touch-Drops
  const handleTouchDrop = (event: Event, index: number) => {
    const customEvent = event as CustomEvent;
    onDrop(customEvent.detail.event, index);
  };

  return (
    <div 
      className="grid grid-cols-3 gap-2 bg-gray-200 p-4 rounded-lg shadow-lg"
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {gridState.map((cell, index) => (
        <div
          key={index}
          className="border-2 border-gray-400 bg-white h-24 w-24 flex items-center justify-center relative cursor-pointer hover:border-primary-400 transition-colors touch-manipulation"
          data-testid={`grid-cell-${index}`}
          data-drop-target="true"
          data-drop-type="grid"
          data-drop-index={index}
          onDrop={(event) => onDrop(event, index)}
          onDragOver={(event) => event.preventDefault()}
          onClick={() => onCellClick(index)}
          style={{ minHeight: '96px', minWidth: '96px' }}
          ref={(el) => {
            if (el) {
              el.addEventListener('touchDrop', (e) => handleTouchDrop(e, index));
            }
          }}
        >
          {cell ? (
            <img 
              src={cell} 
              alt={`Puzzle part ${index}`} 
              className="h-full w-full object-cover rounded cursor-grab active:cursor-grabbing"
              draggable={true}
              onDragStart={(event) => onDragStart(event, index)}
              onTouchStart={onTouchStart ? (event) => onTouchStart(event, index) : undefined}
            />
          ) : (
            <div className="text-gray-400 text-xs text-center">
              {index + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
