import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  familyName?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ familyName, onBack }) => {
  return (
    <div className="relative overflow-hidden bg-white/85 backdrop-blur-lg rounded-2xl shadow-card border border-white/30 p-4 lg:p-6 mb-6 lg:mb-8">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-purple-500/3 to-pink-500/3"></div>
      
      <div className="relative flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 bg-white/50 hover:bg-white/80 rounded-xl px-3 lg:px-4 py-2 lg:py-3 backdrop-blur-sm shadow-sm"
          >
            <svg className="icon-responsive mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium text-sm lg:text-base">Back</span>
          </button>
        )}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center mb-1 lg:mb-2">
            <Image
              src="/logo.png"
              alt="Chore Chat"
              width={24}
              height={24}
              className="rounded-lg mr-2 lg:mr-3 lg:w-8 lg:h-8"
            />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 leading-tight">
              {familyName || 'Family Management'}
            </h1>
          </div>
          <p className="text-gray-600 text-sm lg:text-base font-medium">Manage your family's chore bank</p>
        </div>
        <div className="w-12 lg:w-16" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Header;
