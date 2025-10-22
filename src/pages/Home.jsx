import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CardRicetta from "../components/CardRicetta";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { showToast } from "../components/ToastNotification";

export default function Home() {
  const { items: recipes, status, error } = useSelector((state) => state.recipes);
  const favorites = useSelector((state) => state.favorites.items); // <-- fuori dalla map
  const dispatch = useDispatch(); // <-- fuori dalla map
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-light-background dark:bg-dark-background">
      
      <div className="w-full py-6">
        <SearchBar onSearch={() => setHasSearched(true)} />
      </div>

      <main className="flex flex-col items-center flex-grow px-4 py-8">

        {status === "loading" && (
          <p className="mt-6 text-green-700 dark:text-green-400">
            Loading recipes...
          </p>
        )}

        {status === "failed" && (
          <p className="mt-6 text-red-600 dark:text-red-400">{error}</p>
        )}

        {status !== "loading" && hasSearched && (!recipes || recipes.length === 0) && (
          <p className="mt-6 text-gray-700 dark:text-gray-400">
            No recipes found.
          </p>
        )}

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {recipes && recipes.map((recipe) => {
            const isFavorite = favorites.some(f => f.id === recipe.id);

            return (
              <CardRicetta
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image && recipe.image.startsWith("http") ? recipe.image : "../assets/img/fallback.png"}
                summary={recipe.summary || "No description available"}
                isFavorite={isFavorite}
                onFavoriteToggle={() => {
                   dispatch(toggleFavorite(recipe));
  if (isFavorite) showToast("Rimosso dai preferiti", "danger");
  else showToast("Aggiunto ai preferiti", "success");
                }}
              />
            );
          })}
        </section>

      </main>
    </div>
  );
}
