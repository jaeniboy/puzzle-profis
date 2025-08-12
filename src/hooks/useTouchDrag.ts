import { useState, useCallback } from 'react';

interface TouchDragData {
  type: 'availablePart' | 'gridPart';
  index: number;
  piece: string;
}

interface TouchPosition {
  x: number;
  y: number;
}

export const useTouchDrag = () => {
  const [dragData, setDragData] = useState<TouchDragData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<TouchPosition>({ x: 0, y: 0 });

  const handleTouchStart = useCallback((
    event: React.TouchEvent,
    type: 'availablePart' | 'gridPart',
    index: number,
    piece: string
  ) => {
    event.preventDefault();
    const touch = event.touches[0];
    
    setDragData({ type, index, piece });
    setIsDragging(true);
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    if (!isDragging) return;
    
    event.preventDefault();
    const touch = event.touches[0];
    setDragPosition({ x: touch.clientX, y: touch.clientY });
  }, [isDragging]);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (!isDragging || !dragData) return;
    
    event.preventDefault();
    const touch = event.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (elementBelow) {
      // Finde das nächste Drop-Target
      const dropTarget = elementBelow.closest('[data-drop-target]');
      if (dropTarget) {
        const dropType = dropTarget.getAttribute('data-drop-type');
        const dropIndex = dropTarget.getAttribute('data-drop-index');
        
        // Erstelle ein künstliches Drop-Event
        const customEvent = {
          preventDefault: () => {},
          dataTransfer: {
            getData: () => JSON.stringify(dragData)
          }
        } as any;
        
        if (dropType === 'grid' && dropIndex !== null) {
          // Trigger Grid Drop
          const gridDropEvent = new CustomEvent('touchDrop', {
            detail: { event: customEvent, targetIndex: parseInt(dropIndex) }
          });
          dropTarget.dispatchEvent(gridDropEvent);
        } else if (dropType === 'parts') {
          // Trigger Parts Area Drop
          const partsDropEvent = new CustomEvent('touchDropParts', {
            detail: { event: customEvent }
          });
          dropTarget.dispatchEvent(partsDropEvent);
        }
      }
    }
    
    setDragData(null);
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
  }, [isDragging, dragData]);

  const resetDrag = useCallback(() => {
    setDragData(null);
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
  }, []);

  return {
    dragData,
    isDragging,
    dragPosition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    resetDrag
  };
};
