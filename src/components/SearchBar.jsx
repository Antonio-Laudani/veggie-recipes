import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../store/recipesSlice";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return alert("Please enter a valid search term.");

    dispatch(fetchRecipes(q)); // chiamata API solo su submit
    if (onSearch) onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[92%] sm:w-[80%] md:w-[64%] lg:w-[48%] mx-auto flex flex-col sm:flex-row items-center gap-3 bg-light-backgrond dark:bg-dark-background rounded-lg p-3 transition-all"
    >
      <div className="relative w-full">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search for a recipe, ingredient, or dish..."
          className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-light-background focus:ring-light-green focus:border-dark-green dark:bg-dark-background dark:border-gray-600 dark:placeholder-dark-gray dark:text-white dark:focus:ring-green-darkest dark:focus:border-bright-green"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 dark:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path stroke="currentColor" strokeWidth="2" d="M19 19l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto text-white dark:text-black bg-light-green hover:bg-dark-green focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-bright-green dark:hover:bg-green-700 "
      >
        Search
      </button>
    </form>
  );
}
