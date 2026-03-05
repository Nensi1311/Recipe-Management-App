"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchRecipes } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/RecipeCard";
import Link from "next/link";
import { Bookmark, BookOpen } from "lucide-react";

export default function CookbookPage() {
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((state: RootState) => state.cookbook.savedIds);
  const allRecipes = useSelector((state: RootState) => state.recipes.recipes);
  const status = useSelector((state: RootState) => state.recipes.status);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRecipes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const filtered = allRecipes.filter((r) => savedIds.includes(r.id));
    setSavedRecipes(filtered);
  }, [allRecipes, savedIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Bookmark size={28} className="text-purple-400" />
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Cookbook</h1>
          <p className="text-gray-400">
            {savedRecipes.length > 0
              ? `${savedRecipes.length} saved recipe${savedRecipes.length > 1 ? "s" : ""}`
              : "Your recipe collection"}
          </p>
        </div>
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 rounded bg-gray-800 flex items-center justify-center mb-6">
            <Bookmark size={56} className="text-gray-700" />
          </div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">
            No Saved Recipes Yet
          </h3>
          <p className="text-gray-500 mb-6 text-center max-w-md">
            Start exploring recipes and save your favorites by clicking the
            heart icon!
          </p>
          <Link
            href="/recipes"
            className="flex items-center gap-2 px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            <BookOpen size={18} />
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
}
