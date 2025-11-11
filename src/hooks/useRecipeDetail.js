import { useState, useEffect } from "react";
import { getRecipeById } from "../API/api";
import fallbackImg from "../assets/img/fallback.png";

export default function useRecipeDetail(id) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);

        const calories =
          data?.nutrition?.nutrients?.find(
            (n) => n.name.toLowerCase() === "calories"
          )?.amount || 0;

        setRecipe({
          title: data.title,
          image: data.image || fallbackImg,
          vegan: data.vegan,
          vegetarian: data.vegetarian,
          glutenFree: data.glutenFree,
          readyInMinutes: data.readyInMinutes,
          servings: data.servings,
          calories,
          diets: data.diets,
          extendedIngredients: data.extendedIngredients || [],
          instructions:
            data.instructions?.replace(/<\/?[^>]+(>|$)/g, "") ||
            "Nessuna istruzione disponibile.",
        });

        setServings(data.servings);
      } catch (err) {
        console.error("Errore API:", err);
        setError("Impossibile caricare la ricetta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, setRecipe, loading, error, servings, setServings };
}
