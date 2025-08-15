import React from 'react'
// import { LogoAndDescription } from './LogoAndDescription'
import { ImageSelection } from './ImageSelection'
import type { PuzzleImage } from '../../types'

interface HomeScreenProps {
  images: PuzzleImage[]
  onImageSelect: (image: PuzzleImage) => void
  className?: string
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  images,
  onImageSelect,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 ${className}`} data-testid="home-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Logo and Description Section */}
          {/* <LogoAndDescription /> */}
          
          {/* Image Selection Section */}
          <div className="max-w-6xl mx-auto">
            <ImageSelection 
              images={images}
              onImageSelect={onImageSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
