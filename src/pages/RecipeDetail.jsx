// src/pages/RecipeDetail.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fallbackImg from "../assets/img/fallback.png";
import "flowbite";
import { useSelector, useDispatch } from "react-redux";
// Components
import RecipeHeader from "../components/RecipeHeader";
import RecipeImage from "../components/RecipeImage";
import RecipeInfoCard from "../components/RecipeInfoCard";
import BadgeList from "../components/BadgeList";
import CounterBar from "../components/CounterBar";
import IngredientCard from "../components/IngredientCard";
import { toggleFavorite } from "../store/favoritesSlice";
import { showToast } from "../components/ToastNotification";
// API
import { getRecipeById } from "../API/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servings, setServings] = useState(1);
  
  const dispatch = useDispatch();
const favorites = useSelector((state) => state.favorites.items);
const isFavorite = favorites.some((f) => f.id === Number(id));

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await getRecipeById(id);
      // Estrai in modo sicuro le kcal
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
          calories: data.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || 0,
          diets: data.diets,
          extendedIngredients: data.extendedIngredients || [],
          instructions: data.instructions?.replace(/<\/?[^>]+(>|$)/g, "") || "Nessuna istruzione disponibile.",
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

  const incrementServings = () => setServings(prev => prev + 1);
  const decrementServings = () => setServings(prev => Math.max(1, prev - 1));
const toggleFavoriteHandler = () => {
  if (recipe) {
    dispatch(toggleFavorite({ id: Number(id), title: recipe.title, image: recipe.image }));
    if (isFavorite) showToast("Rimosso dai preferiti", "danger");
    else showToast("Aggiunto ai preferiti", "success");
  }
};


  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-light-green border-r-transparent"></div>
      </div>
    );

  if (error || !recipe)
    return <div className="text-center text-red-500 mt-8">{error || "Ricetta non disponibile."}</div>;

  const adjustedIngredients = recipe.extendedIngredients.map((ing) => ({
    ...ing,
    amount: (ing.amount / recipe.servings) * servings,
  }));
  const adjustedCalories = (recipe.calories / recipe.servings) * servings;

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
    <RecipeHeader
  title={recipe.title}
  favorite={isFavorite}
  toggleFavorite={toggleFavoriteHandler}
  navigate={navigate}
/>
      {/* Image + Info */}
      <div className="flex flex-col lg:flex-row gap-4">
        <RecipeImage image={recipe.image} title={recipe.title} fallbackImg={fallbackImg} />
        <div className="lg:w-1/2 flex flex-col justify-start gap-4">
          <RecipeInfoCard
            readyInMinutes={recipe.readyInMinutes}
            calories={adjustedCalories}
            servings={servings}
            instructions={recipe.instructions}
          />
          <BadgeList vegan={recipe.vegan} vegetarian={recipe.vegetarian} glutenFree={recipe.glutenFree} />
        </div>
      </div>

      {/* Counter bar */}
      <CounterBar
        servings={servings}
        incrementServings={incrementServings}
        decrementServings={decrementServings}
        readyInMinutes={recipe.readyInMinutes}
        calories={adjustedCalories}
      />

      {/* Ingredienti */}
      <IngredientCard adjustedIngredients={adjustedIngredients} />
    </div>
  );
}
