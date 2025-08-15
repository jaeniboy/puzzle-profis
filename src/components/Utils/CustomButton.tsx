import React from 'react'

interface CustomButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  'data-testid'?: string
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  'data-testid': testId,
}) => {
  const baseClasses = 'font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
  
  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-yellow-500 hover:bg-yellow-600 text-white'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-base',
    md: 'px-6 py-3 text-xl',
    lg: 'px-8 py-4 text-2xl'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
      data-testid={testId}
      onContextMenu={(e) => e.preventDefault()} // Disable context menu
    >
      {children}
    </button>
  )
}
