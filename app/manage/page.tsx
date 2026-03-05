"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store";
import { fetchRecipes, deleteRecipeThunk } from "@/store/recipeSlice";
import RecipeCard from "@/components/RecipeCard";
import { Recipe } from "@/types/recipe";
import { Plus, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function ManagePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    // Always fetch everything (including drafts) when entering manage
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleEdit = (recipe: Recipe) => {
    router.push(`/manage/${recipe.id}/edit`);
  };

  const handleDelete = async (recipe: Recipe) => {
    console.log("handleDelete called for recipe:", recipe.id, recipe.title);
    if (confirm(`Delete "${recipe.title}"?`)) {
      console.log("Dispatching deleteRecipeThunk for:", recipe.id);
      dispatch(deleteRecipeThunk(recipe.id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Recipes</h1>
          <p className="text-gray-400 mt-1">
            {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/manage/create"
          className="flex items-center gap-2 px-5 py-2.5 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          <Plus size={18} />
          New Recipe
        </Link>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant="manage"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-24 h-24 rounded bg-gray-800 flex items-center justify-center mb-4">
            <UtensilsCrossed size={40} className="text-gray-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-400 mb-2">
            No recipes yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first recipe to get started!
          </p>
          <Link
            href="/manage/create"
            className="flex items-center gap-2 px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            <Plus size={18} />
            Create Recipe
          </Link>
        </div>
      )}
    </div>
  );
}
