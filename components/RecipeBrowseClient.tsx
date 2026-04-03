"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setFilters, setRecipes } from "@/store/recipeSlice";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";
import { RecipeFiltersBar } from "./RecipeFiltersBar";

interface Props {
  initialRecipes: Recipe[];
}

export function RecipeBrowseClient({ initialRecipes }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredRecipes, count } = useFilteredRecipes();

  useEffect(() => {
    dispatch(setRecipes(initialRecipes));
    dispatch(setFilters({ published: true }));
  }, [dispatch, initialRecipes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">Browse Recipes</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">{count} recipe{count !== 1 ? "s" : ""} found</p>
      </div>

      <div className="flex gap-8">
        <aside className="w-72 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24">
            <RecipeFiltersBar />
          </div>
        </aside>

        <div className="flex-1">
          {filteredRecipes.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display text-2xl font-semibold text-stone-700 dark:text-stone-300 mb-2">No recipes found</h3>
              <p className="text-stone-500">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
