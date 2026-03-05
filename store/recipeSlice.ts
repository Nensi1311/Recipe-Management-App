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
  category: "",
  dietaryTags: [],
  difficulty: "",
  search: "",
  maxCookTime: null,
  published: null,
};

const STORAGE_KEY = "user_recipes";

const saveToStorage = (recipes: Recipe[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }
};

const initialState: RecipeState = {
  recipes: [],
  filters: initialFilters,
  selectedRecipe: null,
  status: "idle",
  error: null,
};

// ── Async Thunks ─────────────────────────────────────────

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (filters?: Partial<RecipeFilters>) => {
    const params = new URLSearchParams();
    if (filters?.category) params.set("category", filters.category);
    if (filters?.dietaryTags && filters.dietaryTags.length > 0)
      params.set("dietaryTags", filters.dietaryTags.join(","));
    if (filters?.difficulty) params.set("difficulty", filters.difficulty);
    if (filters?.search) params.set("search", filters.search);
    if (filters?.maxCookTime !== null && filters?.maxCookTime !== undefined)
      params.set("maxCookTime", String(filters.maxCookTime));
    if (filters?.published !== null && filters?.published !== undefined)
      params.set("published", String(filters.published));

    const query = params.toString();
    const url = `/api/recipes${query ? `?${query}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch recipes");
    return (await res.json()) as Recipe[];
  },
);

export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (
    data: Omit<
      Recipe,
      "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt"
    >,
  ) => {
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.errors?.join(", ") || "Failed to create recipe");
    }
    return (await res.json()) as Recipe;
  },
);

export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async ({ id, data }: { id: string; data: Partial<Recipe> }) => {
    const res = await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update recipe");
    return (await res.json()) as Recipe;
  },
);

export const deleteRecipeThunk = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id: string) => {
    const res = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete recipe");
    return id;
  },
);

export const rateRecipe = createAsyncThunk(
  "recipes/rateRecipe",
  async ({ id, rating }: { id: string; rating: number }) => {
    const res = await fetch(`/api/recipes/${id}/rate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating }),
    });
    if (!res.ok) throw new Error("Failed to rate recipe");
    const result = (await res.json()) as {
      rating: number;
      ratingCount: number;
    };
    return { id, ...result };
  },
);

// ── Slice ────────────────────────────────────────────────

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    hydrateRecipes(state) {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as Recipe[];
            // Merge logic: prefer state.recipes (fetched from server) but add missing ones from stored
            const serverIds = new Set(state.recipes.map((r) => r.id));
            const userAdded = parsed.filter((r) => !serverIds.has(r.id));
            state.recipes = [...state.recipes, ...userAdded].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            );
          } catch (e) {
            console.error("Failed to parse recipes from storage", e);
          }
        }
      }
    },
    addRecipe(state, action: PayloadAction<Recipe>) {
      state.recipes.unshift(action.payload);
      saveToStorage(state.recipes);
    },
    updateRecipe(state, action: PayloadAction<Recipe>) {
      const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) {
        state.recipes[idx] = action.payload;
        saveToStorage(state.recipes);
      }
    },
    removeRecipe(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      saveToStorage(state.recipes);
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
      // fetchRecipes
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
      // createRecipe
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
        saveToStorage(state.recipes);
      })
      // editRecipe
      .addCase(editRecipe.fulfilled, (state, action) => {
        const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) {
          state.recipes[idx] = action.payload;
          saveToStorage(state.recipes);
        }
        if (state.selectedRecipe?.id === action.payload.id) {
          state.selectedRecipe = action.payload;
        }
      })
      // deleteRecipe
      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        console.log(
          "deleteRecipeThunk.fulfilled with payload:",
          action.payload,
        );
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
        saveToStorage(state.recipes);
      })
      // rateRecipe
      .addCase(rateRecipe.fulfilled, (state, action) => {
        const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) {
          state.recipes[idx].rating = action.payload.rating;
          state.recipes[idx].ratingCount = action.payload.ratingCount;
          saveToStorage(state.recipes);
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
  hydrateRecipes,
  addRecipe: addRecipeAction,
  updateRecipe: updateRecipeAction,
  removeRecipe,
  setFilters,
  clearFilters,
  setSelectedRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
