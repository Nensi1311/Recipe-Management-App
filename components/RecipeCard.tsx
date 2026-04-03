"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { Recipe } from "@/types/recipe";
import { StarRating } from "./StarRating";

interface RecipeCardProps {
  recipe: Recipe;
  variant: "public" | "manage";
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const difficultyColors = {
  easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryGradients = [
  "from-orange-400 to-red-500",
  "from-green-400 to-teal-500",
  "from-purple-400 to-pink-500",
  "from-blue-400 to-cyan-500",
  "from-yellow-400 to-orange-500",
  "from-rose-400 to-pink-600",
];

export function RecipeCard({ recipe, variant, onEdit, onDelete, className = "" }: RecipeCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((s: RootState) => s.cookbook.savedIds);
  const isSaved = savedIds.includes(recipe.id);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const gradientIdx = recipe.title.charCodeAt(0) % categoryGradients.length;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) dispatch(unsaveRecipe(recipe.id));
    else dispatch(saveRecipe(recipe.id));
  };

  return (
    <div className={`group bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:shadow-xl hover:shadow-stone-200/60 dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {recipe.coverImageUrl ? (
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${categoryGradients[gradientIdx]} flex items-center justify-center text-5xl`}>
            🍽️
          </div>
        )}
        <button
          onClick={handleHeartClick}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-md ${
            isSaved
              ? "bg-red-500 text-white scale-110"
              : "bg-white/80 dark:bg-stone-800/80 text-stone-400 hover:text-red-500 hover:scale-110"
          }`}
          aria-label={isSaved ? "Remove from cookbook" : "Save to cookbook"}
        >
          {isSaved ? "♥" : "♡"}
        </button>
        {variant === "manage" && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            recipe.published
              ? "bg-emerald-500 text-white"
              : "bg-stone-700 text-stone-200"
          }`}>
            {recipe.published ? "Published" : "Draft"}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-medium text-brand-500 uppercase tracking-wide">{recipe.category}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColors[recipe.difficulty]}`}>
            {recipe.difficulty}
          </span>
        </div>

        <Link href={`/recipes/${recipe.slug}`} className="block">
          <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-brand-500 transition-colors">
            {recipe.title}
          </h3>
        </Link>

        <StarRating rating={recipe.rating} ratingCount={recipe.ratingCount} />

        <div className="flex items-center gap-3 mt-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">⏱️ {totalTime} min</span>
          <span className="flex items-center gap-1">👤 {recipe.servings} servings</span>
        </div>

        {/* Dietary Tags */}
        {recipe.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {recipe.dietaryTags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-400 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {recipe.dietaryTags.length > 3 && (
              <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-500 px-2 py-0.5 rounded-full">
                +{recipe.dietaryTags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Manage Buttons */}
        {variant === "manage" && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={() => onEdit?.(recipe)}
              className="flex-1 text-xs font-medium py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 transition-colors"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onDelete?.(recipe.id)}
              className="flex-1 text-xs font-medium py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
