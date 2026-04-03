"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { fetchRecipes } from "@/store/recipeSlice";
import { RecipeCard } from "@/components/RecipeCard";

export default function CookbookPage() {
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((s: RootState) => s.cookbook.savedIds);
  const allRecipes = useSelector((s: RootState) => s.recipes.recipes);

  useEffect(() => {
    // Hydrate from localStorage
    const stored = localStorage.getItem("cookbook_saved_ids");
    if (stored) {
      try {
        const ids = JSON.parse(stored) as string[];
        dispatch(setSavedIds(ids));
      } catch {
        // ignore
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (allRecipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, allRecipes.length]);

  // Persist to localStorage when savedIds changes
  useEffect(() => {
    localStorage.setItem("cookbook_saved_ids", JSON.stringify(savedIds));
  }, [savedIds]);

  const savedRecipes = allRecipes.filter((r) => savedIds.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">My Cookbook</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-2">
          {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-8xl mb-6">📖</div>
          <h2 className="font-display text-3xl font-semibold text-stone-700 dark:text-stone-300 mb-3">
            Your cookbook is empty
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-sm mx-auto">
            Browse recipes and tap the heart icon to save them here for quick access.
          </p>
          <Link
            href="/recipes"
            className="inline-block px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/30"
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      )}
    </div>
  );
}
