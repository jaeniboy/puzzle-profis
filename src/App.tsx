import { useState } from 'react'
import { HomeScreen, NavBar } from './components'
import GameBoard from './components/GameBoard/GameBoard'
import TrophyScreen from './components/TrophyScreen/TrophyScreen'
import { sampleImages } from './data/images'
import type { PuzzleImage, AppScreen } from './types'

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home')
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null)

  const handleImageSelect = (image: PuzzleImage) => {
    setSelectedImage(image)
    setCurrentScreen('game')
  }

  const handlePuzzleComplete = () => {
    setCurrentScreen('trophy')
  }

  const handlePlayAgain = () => {
    setSelectedImage(null)
    setCurrentScreen('home')
  }

  const handleBackToHome = () => {
    setSelectedImage(null)
    setCurrentScreen('home')
  }

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            images={sampleImages}
            onImageSelect={handleImageSelect}
          />
        )
      case 'game':
        return selectedImage ? (
          <GameBoard 
            selectedImage={selectedImage}
            onPuzzleComplete={handlePuzzleComplete}
          />
        ) : (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl">Kein Bild ausgewählt</p>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded"
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>
        )
      case 'trophy':
        return <TrophyScreen onPlayAgain={handlePlayAgain} />
      default:
        return null
    }
  }

  return (
    <div className="app flex flex-col h-screen pt-16">
        <NavBar 
          onHomeClick={handleBackToHome} 
          onResumeClick={() => selectedImage && setCurrentScreen('game')} 
        />
      <div className="flex-grow overflow-hidden">
        {renderCurrentScreen()}
      </div>
    </div>
  )
}

export default App
