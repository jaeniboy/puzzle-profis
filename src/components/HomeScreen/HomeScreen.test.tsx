import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomeScreen } from './HomeScreen'
import type { PuzzleImage } from '../../types'

const mockImages: PuzzleImage[] = [
  {
    id: '1',
    name: 'Katze',
    src: '/images/cat.jpg',
    alt: 'Eine süße Katze'
  },
  {
    id: '2',
    name: 'Hund', 
    src: '/images/dog.jpg',
    alt: 'Ein freundlicher Hund'
  }
]

describe('HomeScreen', () => {
  it('renders LogoAndDescription component', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    expect(screen.getByTestId('logo-and-description')).toBeInTheDocument()
    expect(screen.getByText('Puzzle Profis')).toBeInTheDocument()
  })

  it('renders ImageSelection component', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    expect(screen.getByTestId('image-selection')).toBeInTheDocument()
    expect(screen.getByText('Wähle dein Lieblings-Puzzle! 🎨')).toBeInTheDocument()
  })

  it('passes images to ImageSelection component', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    mockImages.forEach((_, index) => {
      expect(screen.getByText(`Puzzle ${index + 1}`)).toBeInTheDocument()
    })
  })

  it('passes onImageSelect callback to ImageSelection', async () => {
    const handleImageSelect = vi.fn()
    const user = userEvent.setup()
    
    render(<HomeScreen images={mockImages} onImageSelect={handleImageSelect} />)
    
    await user.click(screen.getByTestId('image-option-1'))
    
    expect(handleImageSelect).toHaveBeenCalledTimes(1)
    expect(handleImageSelect).toHaveBeenCalledWith(mockImages[0])
  })

  it('has correct container structure and styling', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    const homeScreen = screen.getByTestId('home-screen')
    expect(homeScreen).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-blue-50', 'to-purple-50')
  })

  it('applies custom className when provided', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} className="custom-class" />)
    
    const homeScreen = screen.getByTestId('home-screen')
    expect(homeScreen).toHaveClass('custom-class')
  })

  it('has proper layout spacing', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    const container = screen.getByTestId('home-screen').querySelector('.container')
    expect(container).toHaveClass('mx-auto', 'px-4', 'py-8')
    
    const spaceContainer = container?.querySelector('.space-y-8')
    expect(spaceContainer).toBeInTheDocument()
  })

  it('renders with empty images array', () => {
    render(<HomeScreen images={[]} onImageSelect={() => {}} />)
    
    expect(screen.getByTestId('home-screen')).toBeInTheDocument()
    expect(screen.getByTestId('logo-and-description')).toBeInTheDocument()
    expect(screen.getByTestId('image-selection')).toBeInTheDocument()
    expect(screen.getByText('Keine Bilder verfügbar')).toBeInTheDocument()
  })

  it('has responsive max-width for image selection', () => {
    render(<HomeScreen images={mockImages} onImageSelect={() => {}} />)
    
    const imageSelectionContainer = screen.getByTestId('image-selection').parentElement
    expect(imageSelectionContainer).toHaveClass('max-w-6xl', 'mx-auto')
  })
})
