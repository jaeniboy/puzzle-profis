import Trophy from './Trophy';
import ReloadButton from './ReloadButton';

interface TrophyScreenProps {
  onPlayAgain: () => void;
}

const TrophyScreen = ({ onPlayAgain }: TrophyScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <Trophy />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-primary-600">
            Super gemacht! 🌟
          </h1>
          <p className="text-xl font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-700">
            Du hast das Puzzle erfolgreich gelöst!
          </p>
        </div>
        
        <div className="animate-bounce">
          <span className="text-6xl">🎉</span>
        </div>
        
        <ReloadButton onClick={onPlayAgain} />
      </div>
    </div>
  );
};

export default TrophyScreen;
