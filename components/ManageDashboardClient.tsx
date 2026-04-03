"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store";
import { deleteRecipe, setRecipes, setSelectedRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";

export function ManageDashboardClient({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const recipes = useSelector((s: RootState) => s.recipes.recipes);

  useEffect(() => {
    dispatch(setRecipes(initialRecipes));
  }, [dispatch, initialRecipes]);

  const handleEdit = (recipe: Recipe) => {
    dispatch(setSelectedRecipe(recipe));
    router.push(`/manage/${recipe.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;
    dispatch(deleteRecipe(id));
  };

  const published = recipes.filter((r) => r.published);
  const drafts = recipes.filter((r) => !r.published);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">My Recipes</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">{recipes.length} total • {published.length} published • {drafts.length} drafts</p>
        </div>
        <Link
          href="/manage/create"
          className="px-5 py-2.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/30 text-sm"
        >
          + New Recipe
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="font-display text-2xl font-semibold text-stone-700 dark:text-stone-300 mb-2">No recipes yet</h3>
          <p className="text-stone-500 mb-6">Create your first recipe to get started</p>
          <Link href="/manage/create" className="px-6 py-3 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-600 transition-colors">
            Create Recipe
          </Link>
        </div>
      ) : (
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
      )}
    </div>
  );
}
