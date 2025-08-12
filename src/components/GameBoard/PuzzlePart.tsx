const PuzzlePart = ({ src, index }: { src: string; index: number }) => {
  return (
    <div
      className="border border-gray-400 bg-white h-24 w-24 flex items-center justify-center cursor-pointer"
      draggable
      data-testid={`puzzle-part-${index}`}
    >
      <img src={src} alt={`Puzzle part ${index}`} className="h-full w-full object-cover" />
    </div>
  );
};

export default PuzzlePart;
