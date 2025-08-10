export interface PuzzleImage {
  id: string
  name: string
  src: string
  alt: string
}

export interface PuzzlePiece {
  id: string
  imageId: string
  position: number // 0-8 für 3x3 Grid
  src: string
  correctPosition: number
  isCorrect: boolean
}

export interface GameState {
  selectedImage: PuzzleImage | null
  pieces: PuzzlePiece[]
  grid: (PuzzlePiece | null)[] // Array mit 9 Elementen für 3x3 Grid
  isCompleted: boolean
  attempts: number
}

export type AppScreen = 'home' | 'game' | 'trophy'

export interface AppState {
  currentScreen: AppScreen
  gameState: GameState
  lastCompletedImage: PuzzleImage | null
}
