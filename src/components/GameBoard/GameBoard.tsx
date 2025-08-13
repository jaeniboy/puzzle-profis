import React, { useState, useEffect } from 'react';
import PuzzleGrid from './PuzzleGrid';
import PuzzlePartsArea from './PuzzlePartsArea';
import { splitImageIntoParts, shuffleArray, isPuzzleComplete } from '../../utils/puzzleUtils';
import { useTouchDrag } from '../../hooks/useTouchDrag';
import type { PuzzleImage } from '../../types';

interface GameBoardProps {
  selectedImage: PuzzleImage;
  onPuzzleComplete: () => void;
}

const GameBoard = ({ selectedImage, onPuzzleComplete }: GameBoardProps) => {
  const [gridState, setGridState] = useState<(string | null)[]>(Array(9).fill(null));
  const [puzzleParts, setPuzzleParts] = useState<string[]>([]);
  const [partsAreaState, setPartsAreaState] = useState<(string | null)[]>(Array(9).fill(null));
  const [loading, setLoading] = useState(true);
  
  // Touch-Drag-Funktionalität
  const {
    dragData,
    isDragging,
    dragPosition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useTouchDrag();

  useEffect(() => {
    const initializePuzzle = async () => {
      setLoading(true);
      try {
        const parts = await splitImageIntoParts(selectedImage.src);
        setPuzzleParts(parts);
        const shuffled = shuffleArray(parts);
        
        // Initialisiere partsAreaState mit den gemischten Teilen
        const initialPartsArea = Array(9).fill(null);
        shuffled.forEach((part, index) => {
          if (index < 9) {
            initialPartsArea[index] = part;
          }
        });
        setPartsAreaState(initialPartsArea);
        setGridState(Array(9).fill(null));
      } catch (error) {
        console.error('Fehler beim Aufteilen des Bildes:', error);
      } finally {
        setLoading(false);
      }
    };

    initializePuzzle();
  }, [selectedImage]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, targetGridIndex: number) => {
    event.preventDefault();
    const dragData = event.dataTransfer.getData('text/plain');
    const dragInfo = JSON.parse(dragData);
    
    const { type, index, piece } = dragInfo;
    
    if (type === 'availablePart') {
      // Teil aus verfügbaren Teilen ins Grid verschieben
      const updatedGrid = [...gridState];
      const updatedPartsArea = [...partsAreaState];
      
      // Wenn das Zielfeld bereits belegt ist, verschiebe das bestehende Teil zurück in PartsArea
      if (gridState[targetGridIndex] !== null) {
        const displacedPiece = gridState[targetGridIndex]!;
        // Finde den ersten freien Platz in der partsAreaState
        const emptyIndex = updatedPartsArea.findIndex(slot => slot === null);
        if (emptyIndex !== -1) {
          updatedPartsArea[emptyIndex] = displacedPiece;
        }
      }
      
      // Platziere das neue Teil im Grid
      updatedGrid[targetGridIndex] = piece;
      // Entferne das Teil aus der partsAreaState
      updatedPartsArea[index] = null;
      
      setGridState(updatedGrid);
      setPartsAreaState(updatedPartsArea);
      
    } else if (type === 'gridPart') {
      // Teil innerhalb des Grids verschieben
      if (targetGridIndex === index) return; // Gleiches Feld
      
      const updatedGrid = [...gridState];
      const updatedPartsArea = [...partsAreaState];
      
      // Wenn das Zielfeld bereits belegt ist, verschiebe das bestehende Teil zurück in PartsArea
      if (gridState[targetGridIndex] !== null) {
        const displacedPiece = gridState[targetGridIndex]!;
        // Finde den ersten freien Platz in der partsAreaState
        const emptyIndex = updatedPartsArea.findIndex(slot => slot === null);
        if (emptyIndex !== -1) {
          updatedPartsArea[emptyIndex] = displacedPiece;
        }
      }
      
      // Platziere das bewegte Teil im Zielfeld
      updatedGrid[targetGridIndex] = piece;
      updatedGrid[index] = null; // Ursprungsfeld leeren
      
      setGridState(updatedGrid);
      setPartsAreaState(updatedPartsArea);
    }

    // Prüfe ob das Puzzle komplett ist (verwende den aktualisierten Grid-State)
    const finalGrid = [...gridState];
    finalGrid[targetGridIndex] = piece;
    if (type === 'gridPart') {
      finalGrid[index] = null;
    }
    
    if (isPuzzleComplete(finalGrid, puzzleParts)) {
      setTimeout(() => onPuzzleComplete(), 500);
    }
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, partIndex: number) => {
    const piece = partsAreaState[partIndex];
    if (!piece) return; // Leerer Slot
    
    const dragInfo = {
      type: 'availablePart',
      index: partIndex,
      piece: piece
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(dragInfo));
  };

  // Touch-Handler für Puzzle-Teile
  const handlePartTouchStart = (event: React.TouchEvent, partIndex: number) => {
    const piece = partsAreaState[partIndex];
    if (!piece) return;
    
    handleTouchStart(event, 'availablePart', partIndex, piece);
  };

  // Touch-Handler für Grid-Teile
  const handleGridTouchStart = (event: React.TouchEvent, gridIndex: number) => {
    const piece = gridState[gridIndex];
    if (!piece) return;
    
    handleTouchStart(event, 'gridPart', gridIndex, piece);
  };

  const handleGridDragStart = (event: React.DragEvent<HTMLDivElement>, gridIndex: number) => {
    const piece = gridState[gridIndex];
    if (!piece) return;
    
    const dragInfo = {
      type: 'gridPart',
      index: gridIndex,
      piece: piece
    };
    event.dataTransfer.setData('text/plain', JSON.stringify(dragInfo));
  };

  const handleDropToPartsArea = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dragData = event.dataTransfer.getData('text/plain');
    const dragInfo = JSON.parse(dragData);
    
    const { type, index, piece } = dragInfo;
    
    if (type === 'gridPart') {
      // Teil vom Grid zurück zu verfügbaren Teilen verschieben
      const updatedGrid = [...gridState];
      updatedGrid[index] = null;
      setGridState(updatedGrid);
      
      // Finde den ersten freien Platz in der partsAreaState
      const updatedPartsArea = [...partsAreaState];
      const emptyIndex = updatedPartsArea.findIndex(slot => slot === null);
      if (emptyIndex !== -1) {
        updatedPartsArea[emptyIndex] = piece;
        setPartsAreaState(updatedPartsArea);
      }
    }
  };

  const handleGridCellClick = (gridIndex: number) => {
    // Entferne Teil aus dem Raster und füge es zurück zu verfügbaren Teilen hinzu
    if (gridState[gridIndex] !== null) {
      const removedPart = gridState[gridIndex]!;
      const updatedGrid = [...gridState];
      updatedGrid[gridIndex] = null;
      setGridState(updatedGrid);
      
      // Finde den ersten freien Platz in der partsAreaState
      const updatedPartsArea = [...partsAreaState];
      const emptyIndex = updatedPartsArea.findIndex(slot => slot === null);
      if (emptyIndex !== -1) {
        updatedPartsArea[emptyIndex] = removedPart;
        setPartsAreaState(updatedPartsArea);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧩</div>
          <p className="text-xl font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-700">
            Puzzle wird vorbereitet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-primary-600 mb-2">
              {selectedImage.name}
            </h2>
            <p className="text-lg font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-600">
              Ziehe die Teile an die richtige Stelle! 🎯
            </p>
            <div className="block md:hidden mt-2">
              <p className="text-sm font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-500">
                💡 Auf dem Smartphone: Teile antippen und ziehen
              </p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-6xl mx-auto">
            {/* Puzzle Grid */}
            <div className="flex-shrink-0">
              <PuzzleGrid 
                onDrop={handleDrop} 
                gridState={gridState}
                onCellClick={handleGridCellClick}
                onDragStart={handleGridDragStart}
                onTouchStart={handleGridTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
            
            {/* Puzzle Parts Area */}
            <div className="flex-grow">
              <h3 className="text-lg font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-center text-gray-800 mb-4">
                Puzzle-Teile ({partsAreaState.filter(part => part !== null).length} übrig)
              </h3>
              <PuzzlePartsArea 
                parts={partsAreaState} 
                onDragStart={handleDragStart}
                onDrop={handleDropToPartsArea}
                onTouchStart={handlePartTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Touch Drag Vorschau */}
      {isDragging && dragData && (
        <div
          className="fixed pointer-events-none z-50 opacity-80"
          style={{
            left: dragPosition.x - 48, // 48px = halbe Breite (96px / 2)
            top: dragPosition.y - 48,  // 48px = halbe Höhe (96px / 2)
          }}
        >
          <div className="border-2 border-blue-400 bg-white h-24 w-24 flex items-center justify-center rounded shadow-lg">
            <img 
              src={dragData.piece} 
              alt="Dragging piece" 
              className="h-full w-full object-cover rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
