import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./recipesSlice";
import favoritesReducer from "./favoritesSlice"; // se già esiste

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
   favorites: favoritesReducer,
  },
});
