import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageSelection } from './ImageSelection'
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
  },
  {
    id: '3',
    name: 'Vogel',
    src: '/images/bird.jpg', 
    alt: 'Ein bunter Vogel'
  }
]

describe('ImageSelection', () => {
  it('renders the title', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    expect(screen.getByText('Wähle dein Lieblings-Puzzle! 🎨')).toBeInTheDocument()
  })

  it('renders all provided images', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    mockImages.forEach((image) => {
      expect(screen.getByTestId(`image-option-${image.id}`)).toBeInTheDocument()
      expect(screen.getByAltText(image.alt)).toBeInTheDocument()
    })
  })

  it('calls onImageSelect when an image is clicked', async () => {
    const handleImageSelect = vi.fn()
    const user = userEvent.setup()
    
    render(<ImageSelection images={mockImages} onImageSelect={handleImageSelect} />)
    
    await user.click(screen.getByTestId('image-option-1'))
    
    expect(handleImageSelect).toHaveBeenCalledTimes(1)
    expect(handleImageSelect).toHaveBeenCalledWith(mockImages[0])
  })

  it('renders correct image sources', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    mockImages.forEach(image => {
      const imgElement = screen.getByAltText(image.alt) as HTMLImageElement
      expect(imgElement.src).toContain(image.src)
    })
  })

  it('shows no images message when images array is empty', () => {
    render(<ImageSelection images={[]} onImageSelect={() => {}} />)
    
    expect(screen.getByTestId('no-images-message')).toBeInTheDocument()
    expect(screen.getByText('Keine Bilder verfügbar')).toBeInTheDocument()
    expect(screen.getByText('📷')).toBeInTheDocument()
  })

  it('does not show no images message when images are present', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    expect(screen.queryByTestId('no-images-message')).not.toBeInTheDocument()
  })

  it('has scrollable container for images', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    const container = screen.getByTestId('image-grid-container')
    expect(container).toHaveClass('max-h-96', 'overflow-y-auto')
  })

  it('applies custom className when provided', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} className="custom-class" />)
    
    const container = screen.getByTestId('image-selection')
    expect(container).toHaveClass('custom-class')
  })

  it('has correct grid layout classes', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    const gridContainer = screen.getByTestId('image-grid-container').querySelector('div')
    expect(gridContainer).toHaveClass('grid', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')
  })

  it('has images with correct aspect ratio and hover effects', () => {
    render(<ImageSelection images={mockImages} onImageSelect={() => {}} />)
    
    mockImages.forEach(image => {
      const imageContainer = screen.getByTestId(`image-option-${image.id}`)
      expect(imageContainer).toHaveClass('bg-white', 'rounded-2xl', 'shadow-lg', 'cursor-pointer', 'group')
      
      const imageElement = screen.getByAltText(image.alt)
      expect(imageElement).toHaveAttribute('draggable', 'false')
    })
  })
})
