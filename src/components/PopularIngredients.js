import React from 'react';

const PopularIngredients = ({ onSelectIngredient, disabled }) => {
  const popularIngredients = [
    'Chicken',
    'Mushroom',
    'Salmon',
    'Pasta',
    'Rice',
    'Potato',
    'Tomato',
    'Cheese'
  ];

  return (
    <div className="max-w-3xl mx-auto mb-12 px-4">
      <p className="text-gray-600 mb-4 text-center sm:text-left font-medium">
        Popular:
      </p>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
        {popularIngredients.map((ingredient) => (
          <button
            key={ingredient}
            onClick={() => onSelectIngredient(ingredient)}
            disabled={disabled}
            className="px-4 sm:px-6 py-2 bg-white border-2 border-gray-200 rounded-full hover:border-orange-500 hover:bg-orange-50 transition-all text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {ingredient}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularIngredients;