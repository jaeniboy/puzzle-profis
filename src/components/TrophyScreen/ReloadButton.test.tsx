import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import ReloadButton from './ReloadButton';

test('renders reload button', () => {
  const mockOnClick = vi.fn();
  render(<ReloadButton onClick={mockOnClick} />);
  
  const button = screen.getByRole('button', { name: /nochmal spielen/i });
  expect(button).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const mockOnClick = vi.fn();
  render(<ReloadButton onClick={mockOnClick} />);
  
  const button = screen.getByRole('button', { name: /nochmal spielen/i });
  fireEvent.click(button);
  
  expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test('has correct styling classes', () => {
  const mockOnClick = vi.fn();
  render(<ReloadButton onClick={mockOnClick} />);
  
  const button = screen.getByRole('button', { name: /nochmal spielen/i });
  expect(button).toHaveClass('bg-orange-500', 'hover:bg-orange-600');
});
