import React from 'react'
import type { PuzzleImage } from '../../types'

interface ImageSelectionProps {
  images: PuzzleImage[]
  onImageSelect: (image: PuzzleImage) => void
  className?: string
}

export const ImageSelection: React.FC<ImageSelectionProps> = ({
  images,
  onImageSelect,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`} data-testid="image-selection">
      <h2 className="text-2xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-center text-gray-800 mb-6">
        Wähle dein Lieblings-Puzzle! 🎨
      </h2>
      
      <div className="max-h-96 overflow-y-auto px-2" data-testid="image-grid-container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-2xl shadow-lg p-4 transform transition-all duration-200 hover:scale-102 cursor-pointer group"
              onClick={() => onImageSelect(image)}
              data-testid={`image-option-${image.id}`}
              onContextMenu={(e) => e.preventDefault()} // Disable context menu
            >
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  draggable={false} // Disable image dragging
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-8" data-testid="no-images-message">
          <span className="text-4xl mb-4 block">📷</span>
          <p className="text-2xl font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-600">
            Keine Bilder verfügbar
          </p>
        </div>
      )}
    </div>
  )
}
