import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeFilters } from "@/types/recipe";

interface RecipeState {
  recipes: Recipe[];
  filters: RecipeFilters;
  selectedRecipe: Recipe | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialFilters: RecipeFilters = {
  category: "all",
  dietaryTags: [],
  difficulty: "all",
  search: "",
  maxCookTime: null,
  published: true,
};

const initialState: RecipeState = {
  recipes: [],
  filters: initialFilters,
  selectedRecipe: null,
  status: "idle",
  error: null,
};

// Async Thunks
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (params?: string) => {
    const response = await fetch(`/api/recipes${params ? `?${params}` : ""}`);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    return (await response.json()) as Recipe[];
  },
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (
    recipe: Omit<
      Recipe,
      "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt"
    >,
  ) => {
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) throw new Error("Failed to create recipe");
    return (await response.json()) as Recipe;
  },
);

export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ id, recipe }: { id: string; recipe: Partial<Recipe> }) => {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) throw new Error("Failed to update recipe");
    return (await response.json()) as Recipe;
  },
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id: string) => {
    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete recipe");
    return id;
  },
);

export const rateRecipe = createAsyncThunk(
  "recipes/rateRecipe",
  async ({ id, rating }: { id: string; rating: number }) => {
    const response = await fetch(`/api/recipes/${id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    if (!response.ok) throw new Error("Failed to submit rating");
    return { id, ...(await response.json()) } as {
      id: string;
      rating: number;
      ratingCount: number;
    };
  },
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.recipes.unshift(action.payload);
    },
    updateRecipe: (
      state,
      action: PayloadAction<
        Recipe | { id: string; rating: number; ratingCount: number }
      >,
    ) => {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = { ...state.recipes[index], ...action.payload };
      }
      if (state.selectedRecipe?.id === action.payload.id) {
        state.selectedRecipe = { ...state.selectedRecipe, ...action.payload };
      }
    },
    removeRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<RecipeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    setSelectedRecipe: (state, action: PayloadAction<Recipe | null>) => {
      state.selectedRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (r) => r.id === action.payload.id,
        );
        if (index !== -1) state.recipes[index] = action.payload;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      })
      .addCase(rateRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(
          (r) => r.id === action.payload.id,
        );
        if (index !== -1) {
          state.recipes[index].rating = action.payload.rating;
          state.recipes[index].ratingCount = action.payload.ratingCount;
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
