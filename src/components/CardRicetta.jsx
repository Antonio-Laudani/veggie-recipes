import { Link } from "react-router-dom";
import fallbackImg from "../assets/img/fallback.png";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import { showToast } from "../components/ToastNotification"; 

export default function CardRicetta({ id, title, image, summary, isFavorite }) {
  const dispatch = useDispatch();

  //Titolo e descrizione
  const safeTitle = title || "Title not available";
  const cleanSummary = summary
    ? summary.replace(/<[^>]*>/g, "").trim()
    : "Description not available";

  const safeSummary =
    cleanSummary.length > 100
      ? `${cleanSummary.slice(0, 100)}...`
      : cleanSummary;

  //Gestione toggle preferiti
  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite({ id, title, image, summary }));
    if (isFavorite) showToast("Removed from favorites", "danger");
    else showToast("Added to favorites", "success");
  };

  return (
    <div className="relative max-w-sm bg-light-background rounded-lg shadow-md dark:shadow-dark-green-md transform transition-all duration-500 ease-out hover:shadow-lg dark:hover:shadow-dark-green-lg opacity-0 animate-fadeIn dark:bg-dark-background dark:border-gray-700 flex flex-col h-full">
      
      {/* Bottone preferiti */}
      <button
        onClick={handleFavoriteToggle}
        className="absolute top-2 right-2 z-10 bg-light-background dark:bg-dark-background p-1 rounded-full shadow-md hover:scale-110 transition-transform focus:outline-none"
      >
        <HeartIcon
          className={`w-6 h-6 ${
            isFavorite ? "text-red-500" : "text-light-gray dark:text-dark-gray"
          }`}
        />
      </button>

      {/*Immagine */}
      <Link to={`/recipe/${id}`}>
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={image || fallbackImg}
          alt={safeTitle}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />
      </Link>

      {/* Dettagli */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/recipe/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {safeTitle}
          </h5>
        </Link>

        <p className="mb-3 font-normal text-light-gray dark:text-dark-gray flex-grow">
          {safeSummary}
        </p>

        {/* Pulsante Dettagli */}
        <Link
          to={`/recipe/${id}`}
          className="mt-auto inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white hover:text-white dark:text-black dark:hover:text-black bg-light-green hover:bg-dark-green dark:bg-bright-green dark:hover:bg-green-darkest rounded-lg focus:ring-4 focus:outline-none focus:ring-light-green dark:focus:ring-bright-green"
        >
          Details
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
