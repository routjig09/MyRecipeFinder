import React from 'react';
import { X, Heart } from 'lucide-react';
import { getIngredients } from '../utils/helpers';

const RecipeModal = ({ recipe, onClose, onToggleFavorite, isFavorited }) => {
  if (!recipe) return null;

  const ingredients = getIngredients(recipe);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Recipe Image */}
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Recipe Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Title and Favorite */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              {recipe.strMeal}
            </h2>
            <button
              onClick={() => onToggleFavorite(recipe)}
              className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 flex-shrink-0 transition-colors"
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={24}
                className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
              />
            </button>
          </div>

          {/* Category and Area Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              {recipe.strCategory}
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {recipe.strArea}
            </span>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>📝</span> Ingredients
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ingredients.map((ingredient, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-gray-700 text-sm sm:text-base"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>👨‍🍳</span> Instructions
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm sm:text-base">
              {recipe.strInstructions}
            </p>
          </div>

          {/* Video Link */}
          {recipe.strYoutube && (
            <div className="mt-6">
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-sm sm:text-base font-medium">
                🎥 Watch Video Tutorial
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;