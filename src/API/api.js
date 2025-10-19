// src/API/api.js
const API_KEY = import.meta.env.VITE_SPOON_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function searchRecipes(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/complexSearch?query=${query}&number=10&diet=vegetarian,vegan&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Errore nella fetch delle ricette");
    const data = await response.json();
    return data.results;
  } catch (err) {
    throw err;
  }
}
export async function getRecipeById(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    if (!response.ok) throw new Error("Errore nel recupero della ricetta");
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
