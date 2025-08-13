import React from 'react'

interface LogoAndDescriptionProps {
  className?: string
}

export const LogoAndDescription: React.FC<LogoAndDescriptionProps> = ({ className = '' }) => {
  return (
    <div className={`text-center space-y-4 ${className}`} data-testid="logo-and-description">
      {/* Logo */}
      {/* <div className="flex justify-center items-center space-x-2">
        <span className="text-6xl">🧩</span>
        <h1 className="text-4xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-primary-600">
          Puzzle Profis
        </h1>
      </div> */}
      
      {/* Beschreibung */}
      <div className="max-w-2xl mx-auto">
        {/* <p className="text-2xl font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-700 leading-relaxed">
          Hallo kleine Puzzle-Profis! 🌟
        </p> */}
        <p className="text-lg font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-600 mt-2">
          Ziehe die Puzzle-Teile an die richtige Stelle und mache das Bild komplett!
        </p>
      </div>
    </div>
  )
}
