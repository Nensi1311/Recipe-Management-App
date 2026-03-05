"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchRecipes, deleteRecipe } from "@/store/recipeSlice";
import { RecipeCard } from "@/components/RecipeCard";
import { Plus, ChefHat, LayoutDashboard, Utensils } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";

export default function ManageDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipes("published=false")); // Could fetch all or just pending
    // For now, let's fetch all as the dashboard should show all managed recipes
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this recipe? This action cannot be undone.",
      )
    ) {
      await dispatch(deleteRecipe(id));
    }
  };

  const handleEdit = (recipe: Recipe) => {
    router.push(`/manage/${recipe.id}/edit`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-secondary mb-2">
            {/* <LayoutDashboard size={20} /> */}
            {/* <span className="font-black uppercase tracking-widest text-[10px]">
              Management
            </span> */}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-text">
            Chef <span className="text-primary italic">Dashboard</span>
          </h1>
          <p className="text-text-muted font-medium text-lg mt-2">
            Oversee your culinary portfolio and draft new masterpieces.
          </p>
        </div>
        <Link
          href="/manage/create"
          className="flex items-center gap-3 px-8 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          <Plus size={20} /> New Recipe
        </Link>
      </header>

      {status === "loading" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card h-[400px] rounded-3xl border border-border"
            ></div>
          ))}
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant="manage"
              onEdit={() => handleEdit(recipe)}
              onDelete={() => handleDelete(recipe.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-card rounded-3xl border border-dashed border-border text-center">
          <div className="p-8 bg-background rounded-full mb-8 shadow-inner">
            <Utensils size={48} className="text-text-muted opacity-40" />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-4">
            No recipes yet
          </h3>
          <p className="text-text-muted max-w-md font-medium text-lg leading-relaxed mb-10">
            Your kitchen is prepped and ready. Time to share your first
            world-class recipe with the community.
          </p>
          <Link
            href="/manage/create"
            className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Create Your First Recipe
          </Link>
        </div>
      )}
    </div>
  );
}
