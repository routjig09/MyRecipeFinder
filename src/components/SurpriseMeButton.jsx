import React from 'react';
import { Sparkles } from 'lucide-react';

const SurpriseMeButton = ({ onClick, loading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-3">
        <Sparkles 
          className={`${loading ? 'animate-spin' : 'animate-pulse'}`} 
          size={24} 
        />
        <span>
          {loading ? 'Finding Magic...' : '🎲 Surprise Me!'}
        </span>
        <Sparkles 
          className={`${loading ? 'animate-spin' : 'animate-pulse'}`} 
          size={24} 
        />
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </button>
  );
};

export default SurpriseMeButton;
