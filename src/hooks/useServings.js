// src/hooks/useServings.js
//incremento decremento
export default function useServings(initialServings = 1) {
  const incrementServings = (setServings) =>
    setServings((prev) => prev + 1);

  const decrementServings = (setServings) =>
    setServings((prev) => Math.max(1, prev - 1));

  return { incrementServings, decrementServings };
}

