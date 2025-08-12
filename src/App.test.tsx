import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock console.log to avoid noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {})

// Mock für die puzzle utils
vi.mock('./utils/puzzleUtils', () => ({
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

describe('App', () => {
  it('renders the Navbar with the correct title', () => {
    render(<App />)

    const titles = screen.getAllByText('Puzzle Profis')
    expect(titles.length).toBeGreaterThan(0)
  })

  it('renders HomeScreen by default', () => {
    render(<App />)
    
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
    expect(screen.getByText('Wähle dein Lieblings-Puzzle! 🎨')).toBeInTheDocument()
  })

  it('shows all sample images on home screen', () => {
    render(<App />)
    
    // Check that image names appear
    expect(screen.getByText('Bunte Blumen 🌺')).toBeInTheDocument()
    expect(screen.getByText('Niedliche Tiere 🐱')).toBeInTheDocument()
    expect(screen.getByText('Süße Welpen 🐶')).toBeInTheDocument()
    expect(screen.getByText('Zauberhafte Landschaft 🏞️')).toBeInTheDocument()
    expect(screen.getByText('Fröhliche Freunde 👫')).toBeInTheDocument()
  })

  it('navigates to game screen when an image is selected', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Click on the first image
    await user.click(screen.getByTestId('image-option-20'))
    
    // Should show game screen with image name (instead of loading since mock resolves immediately)
    expect(screen.getByText('Bunte Blumen 🌺')).toBeInTheDocument()
    expect(screen.getByText('Ziehe die Teile an die richtige Stelle! 🎯')).toBeInTheDocument()
  })

  it('can navigate back to home from game screen', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Go to game screen
    await user.click(screen.getByTestId('image-option-20'))
    expect(screen.getByText('Bunte Blumen 🌺')).toBeInTheDocument()
    
    // Go back to home via navbar
    await user.click(screen.getByText('Startseite'))
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
  })

  it('navigates to game when image is selected', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await user.click(screen.getByTestId('image-option-237'))
    
    // Should show the game screen with image name
    expect(screen.getByText('Niedliche Tiere 🐱')).toBeInTheDocument()
    expect(screen.getByText('Ziehe die Teile an die richtige Stelle! 🎯')).toBeInTheDocument()
  })

  it('handles navigation between different screens', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Start at home
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
    
    // Navigate to game
    await user.click(screen.getByTestId('image-option-40'))
    expect(screen.getByText('Süße Welpen 🐶')).toBeInTheDocument()
    
    // Navigate back to home via navbar
    await user.click(screen.getByText('Startseite'))
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
  })

  it('displays correct app structure', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('home-screen').closest('.app')
    expect(appContainer).toBeInTheDocument()
  })
})
