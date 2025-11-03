// src/API/api.js
const BASE_URL = "/.netlify/functions/spoonacular";

export async function searchRecipes(query) {
  const res = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!res.ok) throw new Error("Errore nella fetch delle ricette");
  return await res.json();
}

export async function getRecipeById(id) {
  const res = await fetch(`${BASE_URL}/recipe?id=${id}`);
  if (!res.ok) throw new Error("Errore nel recupero della ricetta");
  return await res.json();
}
