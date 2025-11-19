import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { showToast } from "../components/ToastNotification";
import useRecipeDetail from "../hooks/useRecipeDetail";

// Components
import RecipeHeader from "../components/RecipeHeader";
import RecipeImage from "../components/RecipeImage";
import RecipeInfoCard from "../components/RecipeInfoCard";
import BadgeList from "../components/BadgeList";
import CounterBar from "../components/CounterBar";
import IngredientCard from "../components/IngredientCard";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((f) => f.id === Number(id));

  const { recipe, loading, error, servings, setServings } = useRecipeDetail(id);

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
      <RecipeHeader
        title={recipe.title}
        favorite={isFavorite}
        toggleFavorite={toggleFavoriteHandler}
        navigate={navigate}
      />

      <div className="flex flex-col lg:flex-row gap-4">
        <RecipeImage image={recipe.image} title={recipe.title} />
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

      <CounterBar
         servings={servings}
         setServings={setServings}
         readyInMinutes={recipe.readyInMinutes}
         calories={adjustedCalories}
      />

      <IngredientCard adjustedIngredients={adjustedIngredients} />
    </div>
  );
}
