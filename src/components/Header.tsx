import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  familyName?: string;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ familyName, onBack }) => {
  return (
    <div className="relative overflow-hidden bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mb-8">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
      
      <div className="relative flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-200 bg-white/50 hover:bg-white/80 rounded-2xl px-4 py-3 backdrop-blur-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back</span>
          </button>
        )}
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center mb-2">
            <Image
              src="/logo.png"
              alt="Chore Chat"
              width={32}
              height={32}
              className="rounded-lg mr-3"
            />
            <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 leading-tight">
              {familyName || 'Family Management'}
            </h1>
          </div>
          <p className="text-gray-600 mt-2 font-medium">Manage your family's chore bank</p>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>
    </div>
  );
};

export default Header;
