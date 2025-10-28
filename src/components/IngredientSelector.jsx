import React from 'react';
import { Plus, X, Search } from 'lucide-react';

const IngredientSelector = ({
  searchInput,
  selectedIngredients,
  onSearchInputChange,
  onAddIngredient,
  onRemoveIngredient,
  onSearch,
  onClearAll,
  loading,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchInput.trim()) {
        onAddIngredient();
      } else if (selectedIngredients.length > 0) {
        onSearch();
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-8 px-4">
      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type an ingredient (e.g., chicken, tomato)..."
            className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <button
          onClick={onAddIngredient}
          disabled={!searchInput.trim() || loading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {/* Selected Ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Selected Ingredients ({selectedIngredients.length})
            </h3>
            <button
              onClick={onClearAll}
              className="text-sm text-red-500 hover:text-red-700"
              disabled={loading}
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map((ingredient, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm"
              >
                <span className="font-medium">{ingredient}</span>
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                  disabled={loading}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Button */}
      {selectedIngredients.length > 0 && (
        <button
          onClick={onSearch}
          disabled={loading}
          className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg font-semibold flex items-center justify-center gap-2"
        >
          <Search size={20} />
          {loading ? 'Searching...' : `Find Recipes with ${selectedIngredients.length} Ingredient${selectedIngredients.length > 1 ? 's' : ''}`}
        </button>
      )}
    </div>
  );
};

export default IngredientSelector;
