import { useState } from 'react'
import { HomeScreen, NavBar } from './components'
import { sampleImages } from './data/images'
import type { PuzzleImage, AppScreen } from './types'

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home')
  const [selectedImage, setSelectedImage] = useState<PuzzleImage | null>(null)

  const handleImageSelect = (image: PuzzleImage) => {
    setSelectedImage(image)
    setCurrentScreen('game')
    console.log('Selected image:', image) // Placeholder für Spiellogik
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
        return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Game Screen (Coming Soon)</h1>
              <p className="text-xl">Selected: {selectedImage?.name}</p>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        )
      case 'trophy':
        return (
          <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">🏆 Trophy Screen (Coming Soon)</h1>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="mt-4 px-6 py-3 bg-green-500 text-white rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app flex flex-col min-h-screen">
      <div className="h-16">
      <NavBar 
        onHomeClick={() => setCurrentScreen('home')} 
        onResumeClick={() => setCurrentScreen('game')} 
      />
      </div>
      <div className="flex-grow"> {/* Ensure content takes remaining space */}
        {renderCurrentScreen()}
      </div>
    </div>
  )
}

export default App
