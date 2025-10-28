import { useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  // 🔍 Search recipes by single ingredient - USING ASSIGNED API
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

  // 🔍🔍 Search recipes by MULTIPLE ingredients with VERIFICATION
  const searchRecipesByMultipleIngredients = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      // Step 1: Fetch recipes for each ingredient separately
      const fetchPromises = ingredients.map((ingredient) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(fetchPromises);
      console.log("Multi-ingredient filter results:", results);

      // Filter out null/empty results
      const validResults = results.filter(
        (result) => result.meals && result.meals.length > 0
      );

      if (validResults.length === 0) {
        setError(
          `No recipes found with the selected ingredients. Try different combinations!`
        );
        setRecipes([]);
        setLoading(false);
        return;
      }

      // Step 2: Find recipes that appear in ALL ingredient searches (intersection)
      const recipeMaps = validResults.map((result) => {
        const recipeMap = new Map();
        result.meals.forEach((meal) => {
          recipeMap.set(meal.idMeal, meal);
        });
        return recipeMap;
      });

      const baseRecipes = Array.from(recipeMaps[0].values());
      const commonRecipeIds = baseRecipes
        .filter((recipe) => recipeMaps.every((map) => map.has(recipe.idMeal)))
        .map((recipe) => recipe.idMeal);

      if (commonRecipeIds.length === 0) {
        setError(
          `No recipes found with ALL ${ingredients.length} ingredients. Try different combinations!`
        );
        setRecipes([]);
        setLoading(false);
        return;
      }

      console.log(`Found ${commonRecipeIds.length} potential recipes. Verifying ingredients...`);

      // Step 3: Fetch full details for each recipe and verify ingredients
      const detailsPromises = commonRecipeIds.map((id) =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          .then((res) => res.json())
      );

      const detailsResults = await Promise.all(detailsPromises);
      console.log("Fetched recipe details:", detailsResults);

      // Step 4: Verify that ALL selected ingredients are in the recipe
      const verifiedRecipes = [];

      detailsResults.forEach((result) => {
        if (result.meals && result.meals[0]) {
          const meal = result.meals[0];
          
          // Extract all ingredients from the recipe (strIngredient1 to strIngredient20)
          const recipeIngredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            if (ingredient && ingredient.trim()) {
              recipeIngredients.push(ingredient.toLowerCase().trim());
            }
          }

          console.log(`Recipe: ${meal.strMeal}, Ingredients:`, recipeIngredients);

          // Check if ALL selected ingredients are in the recipe
          const hasAllIngredients = ingredients.every((selectedIng) => {
            const normalizedSelected = selectedIng.toLowerCase().trim();
            return recipeIngredients.some((recipeIng) =>
              recipeIng.includes(normalizedSelected) || normalizedSelected.includes(recipeIng)
            );
          });

          if (hasAllIngredients) {
            verifiedRecipes.push({
              idMeal: meal.idMeal,
              strMeal: meal.strMeal,
              strMealThumb: meal.strMealThumb,
            });
          }
        }
      });

      console.log(`Verified ${verifiedRecipes.length} recipes with all ingredients`);

      if (verifiedRecipes.length > 0) {
        setRecipes(verifiedRecipes);
      } else {
        setError(
          `No recipes found with ALL ${ingredients.length} ingredients: ${ingredients.join(', ')}. Try different combinations!`
        );
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

  // 🎲 Get a random recipe
  const getRandomRecipe = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Random Recipe:", data);

      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError("Could not fetch a random recipe. Try again!");
      }
    } catch (err) {
      console.error("Error fetching random recipe:", err);
      setError("Oops! Failed to get a random recipe. Please try again.");
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
    searchRecipesByMultipleIngredients,
    getRecipeDetails,
    getRandomRecipe,
    toggleFavorite,
    isRecipeFavorited,
    clearSelectedRecipe,
    clearError,
  };
};
