const Trophy = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-pulse">
        <span className="text-8xl">🏆</span>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold text-yellow-600">
          Herzlichen Glückwunsch!
        </h2>
        <p className="text-lg font-family-[Comic_Sans_MS,cursive,sans-serif] text-gray-600 mt-2">
          Du bist ein echter Puzzle-Profi! 🧩
        </p>
      </div>
    </div>
  );
};

export default Trophy;
