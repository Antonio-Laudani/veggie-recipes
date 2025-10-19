export default function RecipeInfoCard({readyInMinutes, calories, servings, instructions}){
    return(
          <div className="lg:w-3/4 flex flex-col justify-start gap-4">
      <div className="card bg-light-background text-light-gray shadow-md dark:bg-dark-background dark:text-dark-gray dark:shadow-dark-green-md p-4 rounded-lg">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Cooking time: {readyInMinutes} min</p>
          <p className="font-semibold">Calories: {Math.round(calories)} kcal</p>
          <p className="font-semibold">
            Servings: {servings} {servings === 1 ? "Serving" : "Servings"}
          </p>
        </div>
        <p className="mt-2">{instructions || "Istruzioni non reperibili"}</p>
      </div>
    </div>
    );
}