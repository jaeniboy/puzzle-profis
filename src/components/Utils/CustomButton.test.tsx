import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CustomButton } from './CustomButton'

describe('CustomButton', () => {
  it('renders children correctly', () => {
    render(
      <CustomButton onClick={() => {}}>
        Test Button
      </CustomButton>
    )
    
    expect(screen.getByText('Test Button')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(
      <CustomButton onClick={handleClick}>
        Click me
      </CustomButton>
    )
    
    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies primary variant classes by default', () => {
    render(
      <CustomButton onClick={() => {}}>
        Primary Button
      </CustomButton>
    )
    
    const button = screen.getByText('Primary Button')
    expect(button).toHaveClass('bg-primary-500', 'hover:bg-primary-600')
  })

  it('applies secondary variant classes when specified', () => {
    render(
      <CustomButton onClick={() => {}} variant="secondary">
        Secondary Button
      </CustomButton>
    )
    
    const button = screen.getByText('Secondary Button')
    expect(button).toHaveClass('bg-orange-500', 'hover:bg-orange-600')
  })

  it('applies correct size classes', () => {
    const { rerender } = render(
      <CustomButton onClick={() => {}} size="sm">
        Small
      </CustomButton>
    )
    
    expect(screen.getByText('Small')).toHaveClass('px-4', 'py-2', 'text-base')
    
    rerender(
      <CustomButton onClick={() => {}} size="lg">
        Large
      </CustomButton>
    )
    
    expect(screen.getByText('Large')).toHaveClass('px-8', 'py-4', 'text-2xl')
  })

  it('is disabled when disabled prop is true', () => {
    const handleClick = vi.fn()
    
    render(
      <CustomButton onClick={handleClick} disabled>
        Disabled Button
      </CustomButton>
    )
    
    const button = screen.getByText('Disabled Button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed')
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(
      <CustomButton onClick={handleClick} disabled>
        Disabled Button
      </CustomButton>
    )
    
    await user.click(screen.getByText('Disabled Button'))
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(
      <CustomButton onClick={() => {}} className="custom-class">
        Custom Button
      </CustomButton>
    )
    
    expect(screen.getByText('Custom Button')).toHaveClass('custom-class')
  })

  it('has correct data-testid when provided', () => {
    render(
      <CustomButton onClick={() => {}} data-testid="test-button">
        Test Button
      </CustomButton>
    )
    
    expect(screen.getByTestId('test-button')).toBeInTheDocument()
  })

  it('prevents context menu on right click', () => {
    render(
      <CustomButton onClick={() => {}}>
        Button
      </CustomButton>
    )
    
    const button = screen.getByText('Button')
    const contextMenuEvent = new MouseEvent('contextmenu', {
      bubbles: true,
      cancelable: true,
    })
    
    const preventDefault = vi.spyOn(contextMenuEvent, 'preventDefault')
    button.dispatchEvent(contextMenuEvent)
    
    expect(preventDefault).toHaveBeenCalled()
  })
})
