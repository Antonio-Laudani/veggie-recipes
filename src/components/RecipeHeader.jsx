// src/components/RecipeHeader.jsx
import { HeartIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
export default function RecipeHeader({ title, favorite, toggleFavorite, navigate }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        className="p-2 bg-light-green rounded hover:bg-dark-green dark:bg-bright-green dark:hover:green-darkest transition"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon className="w-6 h-6 text-white dark:text-black" />
      </button>

      <h1 className="text-2xl pr-4 pl-4 font-bold text-center flex-grow">{title}</h1>

      <button
        onClick={toggleFavorite}
        className="p-2 rounded transition-colors bg-light-green hover:bg-dark-green dark:bg-bright-green dark:hover:green-darkest focus:outline-none"
      >
        <HeartIcon
          className={`w-6 h-6 transition-colors ${favorite ? "text-red-500" : "text-white"}`}
        />
      </button>
    </div>
  );
}
