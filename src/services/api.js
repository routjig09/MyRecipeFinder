// Base URL for TheMealDB API
// const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
const BASE_URL ="https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}";

/**
 * Search recipes by ingredient
 * @param {string} ingredient - The ingredient to search for
 * @returns {Promise<Array>} Array of recipes
 */
export const searchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    throw new Error('Failed to fetch recipes. Please try again.');
  }
};

/**
 * Get full recipe details by ID
 * @param {string} id - Recipe ID
 * @returns {Promise<Object|null>} Recipe details
 */
export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to fetch recipe details.');
  }
};

/**
 * Get a random recipe
 * @returns {Promise<Object|null>} Random recipe
 */
export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    throw new Error('Failed to fetch random recipe.');
  }
};

/**
 * Get recipes by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} Array of recipes
 */
export const getRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw new Error('Failed to fetch recipes by category.');
  }
};

/**
 * Get all available categories
 * @returns {Promise<Array>} Array of categories
 */
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories.');
  }
};

/**
 * Search recipes by name
 * @param {string} name - Recipe name
 * @returns {Promise<Array>} Array of recipes
 */
export const searchRecipesByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes by name:', error);
    throw new Error('Failed to search recipes.');
  }
};