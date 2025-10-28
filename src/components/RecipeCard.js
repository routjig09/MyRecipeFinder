import React from 'react';
import { Heart } from 'lucide-react';

const RecipeCard = ({ recipe, onSelectRecipe, onToggleFavorite, isFavorited }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2"
      onClick={() => onSelectRecipe(recipe.idMeal)}
    >
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 sm:h-56 object-cover"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={20}
            className={
              isFavorited
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }
          />
        </button>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {recipe.strMeal}
        </h4>
        <button className="text-orange-500 text-sm font-medium hover:underline">
          View Recipe →
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;