import { useSelector, useDispatch } from "react-redux";
import CardRicetta from "../components/CardRicetta";
import { toggleFavorite } from "../store/favoritesSlice";
import { showToast } from "../components/ToastNotification";

export default function Favorites() {
  const favorites = useSelector(state => state.favorites.items);
  const dispatch = useDispatch();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-light-background dark:bg-dark-background text-gray-700 dark:text-gray-400">
        <p className="text-xl mt-10">There are no recipes in your favorites.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-light-background dark:bg-dark-background px-4 py-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {favorites.map(recipe => (
          <CardRicetta
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image || "../assets/img/fallback.png"}
            summary={recipe.summary || "No description available"}
            isFavorite={true}
          onFavoriteToggle={() => {
  dispatch(toggleFavorite(recipe));
  showToast("Rimosso dai preferiti", "danger");
}}
          />
        ))}
      </section>
    </div>
  );
}
