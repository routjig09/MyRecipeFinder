import { useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  // 🔍 Search recipes by ingredient - USING ASSIGNED API
  const searchRecipes = async (ingredient) => {
    if (!ingredient || !ingredient.trim()) {
      setError("Please enter an ingredient");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched Recipes:", data);

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError(`No recipes found with "${ingredient}". Try another ingredient!`);
        setRecipes([]);
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError(
        "Oops! Something went wrong. Please check your connection and try again."
      );
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  // 📜 Get full recipe details by ID
  const getRecipeDetails = async (id) => {
    if (!id) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError("Recipe details not found");
      }
    } catch (err) {
      console.error("Error fetching recipe details:", err);
      setError("Failed to load recipe details");
    } finally {
      setLoading(false);
    }
  };

  // ❤️ Toggle favorite recipe
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // ⭐ Check if recipe is already favorited
  const isRecipeFavorited = (recipeId) => favorites.includes(recipeId);

  // 🧹 Clear selected recipe
  const clearSelectedRecipe = () => setSelectedRecipe(null);

  // 🧹 Clear error message
  const clearError = () => setError("");

  return {
    recipes,
    selectedRecipe,
    loading,
    error,
    favorites,
    searchRecipes,
    getRecipeDetails,
    toggleFavorite,
    isRecipeFavorited,
    clearSelectedRecipe,
    clearError,
  };
};
