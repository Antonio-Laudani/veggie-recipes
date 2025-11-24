// src/API/api.js
import { fetchWithTimeout, ApiError } from './apiHelper';

const BASE_URL = "/.netlify/functions/spoonacular";

export async function searchRecipes(query) {
  try {
    const data = await fetchWithTimeout(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
    
    // Solo logica di formattazione dati
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.results)) {
      return data.results;
    } else {
      throw new ApiError('Formato risposta non valido', 500);
    }
  } catch (error) {
    // SEMPLICE: rilancia sempre ApiError - i componenti si occuperanno dei messaggi
    throw error;
  }
}

export async function getRecipeById(id) {
  try {
    return await fetchWithTimeout(`${BASE_URL}/recipe?id=${id}`);
  } catch (error) {
    throw error; // ApiError già formattato
  }
}