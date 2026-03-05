"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setRecipes } from "@/store/recipeSlice";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeFiltersBar } from "@/components/RecipeFiltersBar";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { Recipe } from "@/types/recipe";
import { ChefHat, SearchX } from "lucide-react";

interface BrowseRecipesClientProps {
  initialRecipes: Recipe[];
}

export const BrowseRecipesClient = ({
  initialRecipes,
}: BrowseRecipesClientProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredRecipes } = useFilteredRecipes();

  useEffect(() => {
    dispatch(setRecipes(initialRecipes));
  }, [dispatch, initialRecipes]);

  return (
    <div className="space-y-12 pb-20">
      <RecipeFiltersBar className="sticky top-[90px] z-30" />

      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-card rounded-3xl border border-dashed border-border text-center">
          <div className="p-6 bg-background rounded-full mb-6">
            <SearchX size={48} className="text-text-muted" />
          </div>
          <h3 className="text-2xl font-black tracking-tight mb-2">
            No matching recipes found
          </h3>
          <p className="text-text-muted max-w-md font-medium leading-relaxed">
            We couldn't find any recipes that match your current filter
            selection. Try adjusting your search terms or clearing some filters.
          </p>
        </div>
      )}
    </div>
  );
};
