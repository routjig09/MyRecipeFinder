
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


export const formatInstructions = (instructions) => {
  if (!instructions) return [];
  

  const steps = instructions
    .split(/\r?\n/)
    .filter(step => step.trim().length > 0)
    .map(step => step.trim());
  
  return steps;
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};


export const isFavorite = (favorites, recipeId) => {
  return favorites.some(fav => fav.idMeal === recipeId);
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};


export const loadFavorites = () => {
  try {
    const saved = localStorage.getItem('recipeFavorites');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};


export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};