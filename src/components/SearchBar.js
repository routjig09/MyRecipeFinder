import React from 'react';
import { Search, Loader } from 'lucide-react';

const SearchBar = ({ value, onChange, onSearch, loading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-8 px-4">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient (e.g., chicken, tomato, pasta)..."
          className="w-full px-6 py-4 pr-16 text-base sm:text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-orange-500 shadow-lg transition-all"
          disabled={loading}
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full hover:from-orange-600 hover:to-red-600 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95"
          aria-label="Search recipes"
        >
          {loading ? (
            <Loader className="animate-spin" size={24} />
          ) : (
            <Search size={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;