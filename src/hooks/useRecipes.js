import { useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

 
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

  
  const searchRecipesByMultipleIngredients = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      
      const fetchPromises = ingredients.map((ingredient) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.trim()}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(fetchPromises);
      console.log("Multi-ingredient results:", results);


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

      
      if (validResults.length === 1) {
        setRecipes(validResults[0].meals);
        setLoading(false);
        return;
      }

 
      const recipeMaps = validResults.map((result) => {
        const recipeMap = new Map();
        result.meals.forEach((meal) => {
          recipeMap.set(meal.idMeal, meal);
        });
        return recipeMap;
      });

      const baseRecipes = Array.from(recipeMaps[0].values());

    
      const commonRecipes = baseRecipes.filter((recipe) =>
        recipeMaps.every((map) => map.has(recipe.idMeal))
      );

      if (commonRecipes.length > 0) {
        setRecipes(commonRecipes);
        console.log(`Found ${commonRecipes.length} recipes with all ingredients`);
      } else {
        
        setError(
          `No recipes found with ALL ${ingredients.length} ingredients. Showing recipes with "${ingredients[0]}" instead.`
        );
        setRecipes(validResults[0].meals);
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

  
  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

 
  const isRecipeFavorited = (recipeId) => favorites.includes(recipeId);

 
  const clearSelectedRecipe = () => setSelectedRecipe(null);

 
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
