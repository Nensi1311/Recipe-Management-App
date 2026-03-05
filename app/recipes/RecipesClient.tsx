"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchRecipes } from "@/store/recipeSlice";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import RecipeCard from "@/components/RecipeCard";
import RecipeFiltersBar from "@/components/RecipeFiltersBar";
import { UtensilsCrossed } from "lucide-react";

interface RecipesClientProps {
  initialRecipes: import("@/types/recipe").Recipe[];
}

export default function RecipesClient({ initialRecipes }: RecipesClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, filters, status } = useSelector(
    (state: RootState) => state.recipes,
  );
  const displayRecipes = recipes.length > 0 ? recipes : initialRecipes;
  const { filteredRecipes, count, categories } = useFilteredRecipes(
    displayRecipes,
    filters,
  );

  useEffect(() => {
    // Always fetch fresh published recipes when visiting the browse page
    dispatch(fetchRecipes({ published: true }));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <UtensilsCrossed size={28} className="text-purple-400" />
          <h1 className="text-3xl font-extrabold text-white">Browse Recipes</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-72 shrink-0">
          <div className="lg:sticky lg:top-24">
            <RecipeFiltersBar categories={categories} />
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="flex-1">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <UtensilsCrossed size={36} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No recipes found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
