import {test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PuzzleGrid from './PuzzleGrid';

test('renders empty puzzle grid with 9 cells', () => {
  const mockOnDrop = vi.fn();
  const mockOnCellClick = vi.fn();
  const mockOnDragStart = vi.fn();
  const emptyGridState = Array(9).fill(null);
  
  render(
    <PuzzleGrid 
      onDrop={mockOnDrop} 
      gridState={emptyGridState}
      onCellClick={mockOnCellClick}
      onDragStart={mockOnDragStart}
    />
  );
  
  for (let i = 0; i < 9; i++) {
    expect(screen.getByTestId(`grid-cell-${i}`)).toBeInTheDocument();
  }
});

test('renders puzzle grid with placed pieces', () => {
  const mockOnDrop = vi.fn();
  const mockOnCellClick = vi.fn();
  const mockOnDragStart = vi.fn();
  const gridStateWithPieces = [
    'data:image/png;base64,test1', 
    null, 
    'data:image/png;base64,test2',
    null, null, null, null, null, null
  ];
  
  render(
    <PuzzleGrid 
      onDrop={mockOnDrop} 
      gridState={gridStateWithPieces}
      onCellClick={mockOnCellClick}
      onDragStart={mockOnDragStart}
    />
  );
  
  // Überprüfe, dass Bilder in den richtigen Zellen sind
  const cell0 = screen.getByTestId('grid-cell-0');
  const cell2 = screen.getByTestId('grid-cell-2');
  
  expect(cell0.querySelector('img')).toBeInTheDocument();
  expect(cell2.querySelector('img')).toBeInTheDocument();
  
  // Überprüfe, dass leere Zellen Platznummern anzeigen
  const cell1 = screen.getByTestId('grid-cell-1');
  expect(cell1).toHaveTextContent('2'); // Index 1 + 1 = 2
});

test('pieces in grid are draggable', () => {
  const mockOnDrop = vi.fn();
  const mockOnCellClick = vi.fn();
  const mockOnDragStart = vi.fn();
  const gridStateWithPieces = [
    'data:image/png;base64,test1', 
    null, 
    'data:image/png;base64,test2',
    null, null, null, null, null, null
  ];
  
  render(
    <PuzzleGrid 
      onDrop={mockOnDrop} 
      gridState={gridStateWithPieces}
      onCellClick={mockOnCellClick}
      onDragStart={mockOnDragStart}
    />
  );
  
  // Überprüfe, dass platzierte Bilder draggable sind
  const images = screen.getAllByRole('img');
  images.forEach(img => {
    expect(img).toHaveAttribute('draggable', 'true');
    expect(img).toHaveClass('cursor-grab');
  });
});

test('empty cells show position numbers', () => {
  const mockOnDrop = vi.fn();
  const mockOnCellClick = vi.fn();
  const mockOnDragStart = vi.fn();
  const emptyGridState = Array(9).fill(null);
  
  render(
    <PuzzleGrid 
      onDrop={mockOnDrop} 
      gridState={emptyGridState}
      onCellClick={mockOnCellClick}
      onDragStart={mockOnDragStart}
    />
  );
  
  // Überprüfe, dass alle leeren Zellen ihre Positionsnummer anzeigen
  for (let i = 0; i < 9; i++) {
    const cell = screen.getByTestId(`grid-cell-${i}`);
    expect(cell).toHaveTextContent((i + 1).toString());
  }
});
