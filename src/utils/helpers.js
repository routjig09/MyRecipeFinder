/**
 * Extract ingredients and measurements from recipe object
 * @param {Object} recipe - Recipe object from API
 * @returns {Array} Array of ingredient strings with measurements
 */
export const getIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`.trim());
    }
  }
  return ingredients;
};

/**
 * Format recipe instructions into steps
 * @param {string} instructions - Raw instructions text
 * @returns {Array} Array of instruction steps
 */
export const formatInstructions = (instructions) => {
  if (!instructions) return [];
  
  // Split by numbers followed by period or by line breaks
  const steps = instructions
    .split(/\r?\n/)
    .filter(step => step.trim().length > 0)
    .map(step => step.trim());
  
  return steps;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Check if a recipe is in favorites
 * @param {Array} favorites - Array of favorite recipes
 * @param {string} recipeId - Recipe ID to check
 * @returns {boolean} True if recipe is favorited
 */
export const isFavorite = (favorites, recipeId) => {
  return favorites.some(fav => fav.idMeal === recipeId);
};

/**
 * Save favorites to localStorage
 * @param {Array} favorites - Array of favorite recipes
 */
export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

/**
 * Load favorites from localStorage
 * @returns {Array} Array of favorite recipes
 */
export const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('recipeFavorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

/**
 * Debounce function for search
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};