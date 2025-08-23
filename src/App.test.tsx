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
    expect(screen.getByText('Wähle dein Lieblings-Puzzle!')).toBeInTheDocument()
  })

  it('shows all sample images on home screen', () => {
    render(<App />)
    
    // Check that image options are available via data-testid
    expect(screen.getByTestId('image-option-1')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-2')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-3')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-4')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-5')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-6')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-7')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-8')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-9')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-10')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-11')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-12')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-13')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-14')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-15')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-16')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-17')).toBeInTheDocument()
    expect(screen.getByTestId('image-option-18')).toBeInTheDocument()
    
    // Check that we have the expected number of images
    const imageOptions = screen.getAllByTestId(/^image-option-\d+$/)
    expect(imageOptions).toHaveLength(18)
  })

  it('navigates to game screen when an image is selected', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Click on the first image (index 0 = id "1")
    await user.click(screen.getByTestId('image-option-1'))
    
    // Should show game screen with puzzle grid
    expect(screen.getByTestId('grid-cell-0')).toBeInTheDocument()
  })

  it('can navigate back to home from game screen', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Go to game screen
    await user.click(screen.getByTestId('image-option-1'))
    expect(screen.getByTestId('grid-cell-0')).toBeInTheDocument()
    
    // Go back to home via navbar
    await user.click(screen.getByText('Startseite'))
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
  })

  it('navigates to game when image is selected', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await user.click(screen.getByTestId('image-option-2'))
    
    // Should show the game screen
    expect(screen.getByTestId('grid-cell-0')).toBeInTheDocument()
  })

  it('handles navigation between different screens', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Start at home
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
    
    // Navigate to game
    await user.click(screen.getByTestId('image-option-3'))
    expect(screen.getByTestId('grid-cell-0')).toBeInTheDocument()
    
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
