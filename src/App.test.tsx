import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock console.log to avoid noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {})

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
    
    // Should show game screen placeholder
    expect(screen.getByText('Game Screen (Coming Soon)')).toBeInTheDocument()
    expect(screen.getByText('Selected: Bunte Blumen 🌺')).toBeInTheDocument()
  })

  it('can navigate back to home from game screen', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Go to game screen
    await user.click(screen.getByTestId('image-option-20'))
    expect(screen.getByText('Game Screen (Coming Soon)')).toBeInTheDocument()
    
    // Go back to home
    await user.click(screen.getByText('Back to Home'))
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
  })

  it('logs selected image when navigating to game', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    await user.click(screen.getByTestId('image-option-237'))
    
    expect(console.log).toHaveBeenCalledWith('Selected image:', expect.objectContaining({
      id: '237',
      name: 'Niedliche Tiere 🐱'
    }))
  })

  it('handles navigation between different screens', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Start at home
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
    
    // Navigate to game
    await user.click(screen.getByTestId('image-option-40'))
    expect(screen.getByText('Game Screen (Coming Soon)')).toBeInTheDocument()
    expect(screen.getByText('Selected: Süße Welpen 🐶')).toBeInTheDocument()
    
    // Navigate back to home
    await user.click(screen.getByText('Back to Home'))
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
  })

  it('displays correct app structure', () => {
    render(<App />)
    
    const appContainer = screen.getByTestId('home-screen').closest('.app')
    expect(appContainer).toBeInTheDocument()
  })
})
