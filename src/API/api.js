// src/API/api.js
const BASE_URL = "/.netlify/functions/spoonacular";

export async function searchRecipes(query) {
  const res = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!res.ok) throw new Error("Errore nella fetch delle ricette");
  
  const data = await res.json();
  
  // Gestisci entrambi i formati: risposta completa o solo array
  if (Array.isArray(data)) {
    return data; // Già nel formato corretto (funzione serverless)
  } else if (data && Array.isArray(data.results)) {
    return data.results; // Estrai l'array dalla risposta Spoonacular
  } else {
    throw new Error("Formato risposta API non valido");
  }
}

export async function getRecipeById(id) {
  const res = await fetch(`${BASE_URL}/recipe?id=${id}`);
  if (!res.ok) throw new Error("Errore nel recupero della ricetta");
  return await res.json();
}