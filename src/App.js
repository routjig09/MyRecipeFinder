import React, { useState } from 'react';
import { ChefHat } from 'lucide-react';
import { useRecipes } from './hooks/useRecipes';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PopularIngredients from './components/PopularIngredients';
import RecipeCard from './components/RecipeCard';
import RecipeModal from './components/RecipeModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [searchInput, setSearchInput] = useState('');

  const {
    recipes,
    selectedRecipe,
    loading,
    error,
    searchRecipes,
    getRecipeDetails,
    toggleFavorite,
    isRecipeFavorited,
    clearSelectedRecipe,
    clearError,
  } = useRecipes();

  const handleSearch = () => {
    searchRecipes(searchInput);
  };

  const handleQuickSearch = (ingredient) => {
    setSearchInput(ingredient);
    searchRecipes(ingredient);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-orange-100 p-6 sm:p-8 rounded-full mb-6 animate-bounce-slow">
            <ChefHat className="text-orange-500" size={64} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Hey Taylor! 👋
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            What's in your kitchen today? Let's cook something amazing!
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Popular Ingredients */}
        <PopularIngredients
          onSelectIngredient={handleQuickSearch}
          disabled={loading}
        />

        {/* Error Message */}
        {error && <ErrorMessage message={error} onClose={clearError} />}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Recipe Results */}
        {!loading && recipes.length > 0 && (
          <div className="px-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} for you!
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  onSelectRecipe={getRecipeDetails}
                  onToggleFavorite={toggleFavorite}
                  isFavorited={isRecipeFavorited(recipe.idMeal)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recipes.length === 0 && searchInput && (
          <div className="text-center py-12 px-4">
            <p className="text-gray-600 text-lg">
              Start by searching for an ingredient or click on a popular option above!
            </p>
          </div>
        )}
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={clearSelectedRecipe}
          onToggleFavorite={toggleFavorite}
          isFavorited={isRecipeFavorited(selectedRecipe.idMeal)}
        />
      )}
    </div>
  );
}

export default App;
