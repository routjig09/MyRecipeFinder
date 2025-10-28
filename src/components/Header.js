import React from 'react';
import { ChefHat } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-full">
              <ChefHat className="text-orange-500" size={28} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Recipe Ideas
            </h1>
          </div>
          <div className="text-orange-500 text-sm sm:text-base font-medium">
            ⭐ Find your next delicious meal
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;