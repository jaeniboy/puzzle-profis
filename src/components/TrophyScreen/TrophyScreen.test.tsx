import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import TrophyScreen from './TrophyScreen';

// Mock für die Child-Komponenten
vi.mock('./Trophy', () => ({
  default: () => <div data-testid="trophy">Trophy Component</div>
}));

vi.mock('./ReloadButton', () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="reload-button" onClick={onClick}>
      Nochmal spielen
    </button>
  )
}));

test('renders TrophyScreen with Trophy and ReloadButton', () => {
  const mockOnPlayAgain = vi.fn();
  
  render(<TrophyScreen onPlayAgain={mockOnPlayAgain} />);
  
  expect(screen.getByTestId('trophy')).toBeInTheDocument();
  expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  expect(screen.getByText('Super gemacht! 🌟')).toBeInTheDocument();
  expect(screen.getByText('Du hast das Puzzle erfolgreich gelöst!')).toBeInTheDocument();
});

test('calls onPlayAgain when reload button is clicked', () => {
  const mockOnPlayAgain = vi.fn();
  
  render(<TrophyScreen onPlayAgain={mockOnPlayAgain} />);
  
  const reloadButton = screen.getByTestId('reload-button');
  reloadButton.click();
  
  expect(mockOnPlayAgain).toHaveBeenCalledTimes(1);
});
