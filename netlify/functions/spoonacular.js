// netlify/functions/spoonacular.js

const API_KEY = process.env.VITE_SPOON_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function handler(event) {
  const { path, queryStringParameters } = event;

  try {
    // rotta per ricerca
    if (path.includes("search")) {
      const query = queryStringParameters.query;
      const res = await fetch(
        `${BASE_URL}/complexSearch?query=${query}&number=10&diet=vegetarian,vegan&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data.results),
      };
    }

    // rotta per dettaglio
    if (path.includes("recipe")) {
      const id = queryStringParameters.id;
      const res = await fetch(
        `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid route" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
