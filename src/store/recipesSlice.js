import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchRecipes } from "../API/api";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (query, thunkAPI) => {
    try {
      const results = await searchRecipes(query);
      return results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default recipesSlice.reducer;

