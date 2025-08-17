import React from 'react';
import { CustomButton } from '../Utils/CustomButton';

interface NavBarProps {
  onHomeClick: () => void;
  onResumeClick: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onHomeClick }) => {
// export const NavBar: React.FC<NavBarProps> = ({ onHomeClick, onResumeClick }) => {
  return (
    <nav className="flex fixed top-0 left-0 w-full h-16 bg-primary-500 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl"><img src="./icon-192x192.png" alt="Logo" className="inline-block w-8 h-8" /></span>
          <h1 className="text-xl font-family-[Comic_Sans_MS,cursive,sans-serif] font-bold">Puzzle Profis</h1>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <CustomButton onClick={onHomeClick} variant="secondary" size="sm">
            Startseite
          </CustomButton>
        </div>
      </div>
    </nav>
  );
};
