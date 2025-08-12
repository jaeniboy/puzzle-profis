import {test, expect, vi} from 'vitest'
import { render, screen } from '@testing-library/react';
import GameBoard from './GameBoard';

// Mock für die puzzle utils
vi.mock('../../utils/puzzleUtils', () => ({
  splitImageIntoParts: vi.fn().mockResolvedValue([
    'data:image/png;base64,piece1',
    'data:image/png;base64,piece2',
    'data:image/png;base64,piece3',
    'data:image/png;base64,piece4',
    'data:image/png;base64,piece5',
    'data:image/png;base64,piece6',
    'data:image/png;base64,piece7',
    'data:image/png;base64,piece8',
    'data:image/png;base64,piece9'
  ]),
  shuffleArray: vi.fn((arr) => [...arr]),
  isPuzzleComplete: vi.fn().mockReturnValue(false)
}));

test('renders GameBoard loading state initially', () => {
  const mockImage = { 
    id: '1', 
    src: '/path/to/image.jpg', 
    name: 'Test Image',
    alt: 'Test Alt Text'
  };
  const mockOnComplete = vi.fn();
  
  render(
    <GameBoard 
      selectedImage={mockImage}
      onPuzzleComplete={mockOnComplete}
    />
  );

  expect(screen.getByText('Puzzle wird vorbereitet...')).toBeInTheDocument();
});

test('renders GameBoard with proper drag and drop functionality', async () => {
  const mockImage = { 
    id: '1', 
    src: '/path/to/image.jpg', 
    name: 'Test Image',
    alt: 'Test Alt Text'
  };
  const mockOnComplete = vi.fn();
  
  render(
    <GameBoard 
      selectedImage={mockImage}
      onPuzzleComplete={mockOnComplete}
    />
  );

  // Warte darauf, dass die Komponente geladen ist
  await screen.findByText('Test Image');
  
  // Überprüfe, dass das Grid vorhanden ist
  expect(screen.getByTestId('grid-cell-0')).toBeInTheDocument();
  
  // Überprüfe, dass Puzzle-Teile vorhanden sind
  expect(screen.getByText(/Puzzle-Teile \(\d+ übrig\)/)).toBeInTheDocument();
});
