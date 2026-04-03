import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeFilters } from "@/types/recipe";

interface RecipeState {
  recipes: Recipe[];
  filters: RecipeFilters;
  selectedRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialFilters: RecipeFilters = {
  category: "",
  dietaryTags: [],
  difficulty: "all",
  search: "",
  maxCookTime: null,
  published: null,
};

const initialState: RecipeState = {
  recipes: [],
  filters: initialFilters,
  selectedRecipe: null,
  status: "idle",
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (params?: string) => {
    const query = params ? `?${params}` : "";
    const res = await fetch(`/api/recipes${query}`);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json() as Promise<Recipe[]>;
  }
);

export const createRecipe = createAsyncThunk(
  "recipes/create",
  async (data: Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create recipe");
    return res.json() as Promise<Recipe>;
  }
);

export const editRecipe = createAsyncThunk(
  "recipes/edit",
  async ({ id, data }: { id: string; data: Partial<Recipe> }) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update recipe");
    return res.json() as Promise<Recipe>;
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/delete",
  async (id: string) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete recipe");
    return id;
  }
);

export const rateRecipe = createAsyncThunk(
  "recipes/rate",
  async ({ id, rating }: { id: string; rating: number }) => {
    const res = await fetch(`/api/recipes/${id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    if (!res.ok) throw new Error("Failed to rate recipe");
    const result = await res.json() as { rating: number; ratingCount: number };
    return { id, ...result };
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    addRecipe(state, action: PayloadAction<Recipe>) {
      state.recipes.unshift(action.payload);
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) state.recipes[idx] = action.payload;
      if (state.selectedRecipe?.id === action.payload.id) {
        state.selectedRecipe = action.payload;
      }
    },
    removeRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
    setFilters(state, action: PayloadAction<Partial<RecipeFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialFilters;
    },
    setSelectedRecipe(state, action: PayloadAction<Recipe | null>) {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.recipes[idx] = action.payload;
        if (state.selectedRecipe?.id === action.payload.id) {
          state.selectedRecipe = action.payload;
        }
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      })
      .addCase(rateRecipe.fulfilled, (state, action) => {
        const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) {
          state.recipes[idx].rating = action.payload.rating;
          state.recipes[idx].ratingCount = action.payload.ratingCount;
        }
        if (state.selectedRecipe?.id === action.payload.id) {
          state.selectedRecipe.rating = action.payload.rating;
          state.selectedRecipe.ratingCount = action.payload.ratingCount;
        }
      });
  },
});

export const {
  setRecipes,
  addRecipe,
  updateRecipe,
  removeRecipe,
  setFilters,
  clearFilters,
  setSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
