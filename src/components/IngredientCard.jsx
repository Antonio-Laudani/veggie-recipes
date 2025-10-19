// src/components/IngredientCard.jsx
export default function IngredientCard({ adjustedIngredients }) {
  return (
    <div className="card bg-light-background text-light-gray shadow-md dark:bg-dark-background dark:text-dark-gray dark:shadow-dark-green-md  p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      {adjustedIngredients.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {adjustedIngredients.map((ing) => (
            <li key={ing.id}>
              {ing.amount.toFixed(1)} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
      ) : (
        <p> Ingredients not available</p>
      )}
    </div>
  );
}
