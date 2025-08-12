const ReloadButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-base"
      data-testid="reload-button"
    >
      Nochmal spielen
    </button>
  );
};

export default ReloadButton;
