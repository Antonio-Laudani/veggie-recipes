export default function CounterBar({
  servings,
  incrementServings,
  decrementServings,
  readyInMinutes,
  calories,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6
                    bg-light-background text-light-gray shadow-md dark:bg-dark-background
                    dark:text-dark-gray dark:shadow-dark-green-md p-2 sm:p-4 rounded-lg w-full">
      
      {/* Pulsanti e numero */}
      <div className="flex items-center gap-1 sm:gap-3">
        <button
          onClick={decrementServings}
          className="bg-light-green hover:bg-dark-green dark:bg-bright-green dark:hover:bg-green-darkest
                    text-white dark:text-black rounded-l-md p-1 sm:p-3 h-8 sm:h-11 w-8 sm:w-10 flex items-center justify-center focus:outline-none"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
          </svg>
        </button>

        <span className="text-sm sm:text-base w-20 text-center">
          {servings} {servings === 1 ? "Serving" : "Servings"}
        </span>

        <button
          onClick={incrementServings}
          className="bg-light-green hover:bg-dark-green dark:bg-bright-green dark:hover:bg-green-darkest
                    text-white dark:text-black rounded-r-md p-1 sm:p-3 h-8 sm:h-11 w-8 sm:w-10 flex items-center justify-center focus:outline-none"
        >
          <svg className="w-3 h-3 sm:w-4 sm:h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>

      {/* Info tempo e kcal */}
      <div className="flex flex-row sm:flex-col items-center gap-1 sm:gap-2 text-xs sm:text-sm">
        <span>⏱️ {readyInMinutes} min</span>
        <span>🔥 {Math.round(calories)} kcal</span>
      </div>
    </div>
  );
}
