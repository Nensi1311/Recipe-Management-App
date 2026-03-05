"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchRecipes } from "@/store/recipeSlice";
import { setSavedIds } from "@/store/cookbookSlice";
import { RecipeCard } from "@/components/RecipeCard";
import { Heart, BookOpen, SearchX } from "lucide-react";
import Link from "next/link";

export default function CookbookPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);
  const { savedIds } = useSelector((state: RootState) => state.cookbook);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedRecipeIds");
    if (saved) {
      dispatch(setSavedIds(JSON.parse(saved)));
    }
    setIsHydrated(true);
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("savedRecipeIds", JSON.stringify(savedIds));
    }
  }, [savedIds, isHydrated]);

  const savedRecipes = recipes.filter((r) => savedIds.includes(r.id));

  if (!isHydrated || status === "loading") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card h-[400px] rounded-3xl border border-border shadow-sm"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 text-text">
            My <span className="text-secondary italic">Cookbook</span>
          </h1>
          <p className="text-text-muted font-medium text-lg leading-relaxed">
            Your curated collection of mastered dishes and kitchen inspirations.
          </p>
        </div>
        <div className="px-8 py-3 bg-secondary text-black rounded-2xl font-black text-xl shadow-lg shadow-secondary/20 flex items-center gap-3">
          <Heart size={24} className="fill-white" />
          {savedRecipes.length} Saved
        </div>
      </header>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 bg-card rounded-3xl border border-dashed border-border text-center">
          <div className="p-8 bg-background rounded-full mb-8 shadow-inner">
            <Heart size={48} className="text-secondary" />
          </div>
          <h3 className="text-3xl font-black tracking-tight mb-4">
            Your cookbook is empty
          </h3>
          <p className="text-text-muted max-w-md font-medium text-lg leading-relaxed mb-10">
            Start exploring our collection and save your favorite recipes to
            access them quickly anytime, anywhere.
          </p>
          <Link
            href="/recipes"
            className="flex items-center gap-3 px-10 py-4 bg-primary text-white font-black uppercase tracking-widest square-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            Browse Recipes <BookOpen size={20} />
          </Link>
        </div>
      )}
    </div>
  );
}
