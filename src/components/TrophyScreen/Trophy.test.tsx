import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Trophy from './Trophy';

test('renders trophy with correct emoji and text', () => {
  render(<Trophy />);
  
  expect(screen.getByText('🏆')).toBeInTheDocument();
  expect(screen.getByText('Herzlichen Glückwunsch!')).toBeInTheDocument();
  expect(screen.getByText('Du bist ein echter Puzzle-Profi! 🧩')).toBeInTheDocument();
});

test('trophy has correct styling classes', () => {
  render(<Trophy />);
  
  const trophyEmoji = screen.getByText('🏆');
  expect(trophyEmoji.parentElement).toHaveClass('animate-pulse');
  
  const congratsText = screen.getByText('Herzlichen Glückwunsch!');
  expect(congratsText).toHaveClass('text-yellow-600');
});
