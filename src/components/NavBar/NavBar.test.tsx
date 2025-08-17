import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the logo and title', () => {
    render(<NavBar onHomeClick={() => {}} onResumeClick={() => {}} />);

    expect(screen.getByText('Puzzle Profis')).toBeInTheDocument();
  });

  it('renders the Startseite button', () => {
    render(<NavBar onHomeClick={() => {}} onResumeClick={() => {}} />);

    expect(screen.getByText('Startseite')).toBeInTheDocument();
  });

  it('calls onHomeClick when Startseite button is clicked', async () => {
    const handleHomeClick = vi.fn();
    const user = userEvent.setup();

    render(<NavBar onHomeClick={handleHomeClick} onResumeClick={() => {}} />);

    await user.click(screen.getByText('Startseite'));
    expect(handleHomeClick).toHaveBeenCalledTimes(1);
  });
});
