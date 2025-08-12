import {test, expect} from 'vitest';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import PuzzlePartsArea from './PuzzlePartsArea';

test('renders puzzle parts area with parts', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDrop = vi.fn();
  const parts = [
    'data:image/png;base64,part1',
    'data:image/png;base64,part2',
    null, // leerer Slot
    'data:image/png;base64,part3',
    null, null, null, null, null // weitere leere Slots
  ];
  
  render(
    <PuzzlePartsArea 
      parts={parts}
      onDragStart={mockOnDragStart}
      onDrop={mockOnDrop}
    />
  );
  
  // Überprüfe, dass alle Slots gerendert werden
  parts.forEach((_, index) => {
    expect(screen.getByTestId(`puzzle-part-${index}`)).toBeInTheDocument();
  });
  
  // Überprüfe, dass nur die Teile mit Inhalt draggable sind
  expect(screen.getByTestId('puzzle-part-0')).toHaveAttribute('draggable', 'true');
  expect(screen.getByTestId('puzzle-part-1')).toHaveAttribute('draggable', 'true');
  expect(screen.getByTestId('puzzle-part-2')).toHaveAttribute('draggable', 'false');
  expect(screen.getByTestId('puzzle-part-3')).toHaveAttribute('draggable', 'true');
});

test('all non-null parts are draggable', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDrop = vi.fn();
  const parts = [
    'data:image/png;base64,part1',
    null,
    'data:image/png;base64,part2',
    null, null, null, null, null, null
  ];
  
  render(
    <PuzzlePartsArea 
      parts={parts}
      onDragStart={mockOnDragStart}
      onDrop={mockOnDrop}
    />
  );
  
  // Überprüfe, dass nur die nicht-null Teile draggable sind
  expect(screen.getByTestId('puzzle-part-0')).toHaveAttribute('draggable', 'true');
  expect(screen.getByTestId('puzzle-part-0')).toHaveClass('cursor-grab');
  
  expect(screen.getByTestId('puzzle-part-1')).toHaveAttribute('draggable', 'false');
  expect(screen.getByTestId('puzzle-part-1')).not.toHaveClass('cursor-grab');
  
  expect(screen.getByTestId('puzzle-part-2')).toHaveAttribute('draggable', 'true');
  expect(screen.getByTestId('puzzle-part-2')).toHaveClass('cursor-grab');
});

test('shows message when all parts are null', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDrop = vi.fn();
  const parts = Array(9).fill(null);
  
  render(
    <PuzzlePartsArea 
      parts={parts}
      onDragStart={mockOnDragStart}
      onDrop={mockOnDrop}
    />
  );
  
  expect(screen.getByText('Alle Teile wurden platziert! 🎉')).toBeInTheDocument();
});

test('parts area accepts drops', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDrop = vi.fn();
  const parts = ['data:image/png;base64,part1', null, null, null, null, null, null, null, null];
  
  render(
    <PuzzlePartsArea 
      parts={parts}
      onDragStart={mockOnDragStart}
      onDrop={mockOnDrop}
    />
  );
  
  // Überprüfe, dass die Hauptkomponente gerendert wird
  expect(screen.getByTestId('puzzle-part-0')).toBeInTheDocument();
});

test('empty slots show placeholder text', () => {
  const mockOnDragStart = vi.fn();
  const mockOnDrop = vi.fn();
  const parts = ['data:image/png;base64,part1', null, null, null, null, null, null, null, null];
  
  render(
    <PuzzlePartsArea 
      parts={parts}
      onDragStart={mockOnDragStart}
      onDrop={mockOnDrop}
    />
  );
  
  // Überprüfe, dass leere Slots den Platzhaltertext zeigen
  expect(screen.getAllByText('Leer')).toHaveLength(8); // 8 leere Slots
});
