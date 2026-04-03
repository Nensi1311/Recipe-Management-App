"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setRecipes } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";
import Link from "next/link";

interface HomeClientProps {
  recipes: Recipe[];
  featured: Recipe[];
  recent: Recipe[];
}

export function HomeClient({ recipes, featured, recent }: HomeClientProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setRecipes(recipes));
  }, [dispatch, recipes]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Featured */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">Featured Recipes</h2>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Hand-picked by our community</p>
          </div>
          <Link href="/recipes" className="text-sm font-medium text-brand-500 hover:text-brand-600">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((r) => (
            <RecipeCard key={r.id} recipe={r} variant="public" />
          ))}
        </div>
      </section>

      {/* Recent */}
      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">Recently Added</h2>
              <p className="text-stone-500 dark:text-stone-400 mt-1">Fresh from our kitchen</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recent.map((r) => (
              <RecipeCard key={r.id} recipe={r} variant="public" />
            ))}
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="bg-gradient-to-r from-brand-50 to-amber-50 dark:from-brand-950 dark:to-amber-950 rounded-3xl p-12 text-center border border-brand-100 dark:border-brand-900">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="font-display text-5xl font-bold text-brand-500">{recipes.length}</div>
            <div className="text-stone-600 dark:text-stone-400 mt-1">Recipes</div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-brand-500">
              {new Set(recipes.map((r) => r.category)).size}
            </div>
            <div className="text-stone-600 dark:text-stone-400 mt-1">Categories</div>
          </div>
          <div>
            <div className="font-display text-5xl font-bold text-brand-500">
              {recipes.reduce((a, r) => a + r.ratingCount, 0)}
            </div>
            <div className="text-stone-600 dark:text-stone-400 mt-1">Ratings</div>
          </div>
        </div>
      </section>
    </div>
  );
}
