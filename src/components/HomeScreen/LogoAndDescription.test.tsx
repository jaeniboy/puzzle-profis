import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LogoAndDescription } from './LogoAndDescription'

describe('LogoAndDescription', () => {
  // it('renders the logo and title', () => {
  //   render(<LogoAndDescription />)
  //   
  //   expect(screen.getByText('🧩')).toBeInTheDocument()
  //   expect(screen.getByText('Puzzle Profis')).toBeInTheDocument()
  // })

  // it('renders the welcome message', () => {
  //   render(<LogoAndDescription />)
  //   
  //   expect(screen.getByText('Hallo kleine Puzzle-Profis! 🌟')).toBeInTheDocument()
  // })

  it('renders the instruction text', () => {
    render(<LogoAndDescription />)
    
    const instructionText = screen.getByText(/Ziehe die Puzzle-Teile an die richtige Stelle und mache das Bild komplett!/)
    expect(instructionText).toBeInTheDocument()
  })

  it('has the correct test id', () => {
    render(<LogoAndDescription />)
    
    expect(screen.getByTestId('logo-and-description')).toBeInTheDocument()
  })

  it('applies custom className when provided', () => {
    render(<LogoAndDescription className="custom-class" />)
    
    const container = screen.getByTestId('logo-and-description')
    expect(container).toHaveClass('custom-class')
  })

  // it('has kid-friendly styling classes', () => {
  //   render(<LogoAndDescription />)
  //   
  //   const title = screen.getByText('Puzzle Profis')
  //   expect(title).toHaveClass('font-family-[Comic_Sans_MS,cursive,sans-serif]', 'text-4xl', 'font-bold', 'text-primary-600')
  // })

  it('has proper text hierarchy with instruction text styling', () => {
    render(<LogoAndDescription />)
    
    const instructionText = screen.getByText(/Ziehe die Puzzle-Teile an die richtige Stelle und mache das Bild komplett!/)
    
    expect(instructionText).toHaveClass('text-lg')
    expect(instructionText).toHaveClass('font-family-[Comic_Sans_MS,cursive,sans-serif]')
    expect(instructionText).toHaveClass('text-gray-600')
  })
})
