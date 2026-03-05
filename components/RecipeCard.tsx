"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { Recipe } from "@/types/recipe";
import { Clock, Users, Heart, Edit, Trash2, Star } from "lucide-react";

interface RecipeCardProps {
  recipe: Recipe;
  variant: "public" | "manage";
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-700",
};

export const RecipeCard = ({
  recipe,
  variant,
  onEdit,
  onDelete,
  className,
}: RecipeCardProps) => {
  const dispatch = useDispatch();
  const { savedIds } = useSelector((state: RootState) => state.cookbook);
  const isSaved = savedIds.includes(recipe.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    let newSavedIds: string[];
    if (isSaved) {
      dispatch(unsaveRecipe(recipe.id));
      newSavedIds = savedIds.filter((id) => id !== recipe.id);
    } else {
      dispatch(saveRecipe(recipe.id));
      newSavedIds = [...savedIds, recipe.id];
    }
    localStorage.setItem("savedRecipeIds", JSON.stringify(newSavedIds));
  };

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
  const difficultyClass =
    difficultyColors[recipe.difficulty?.toLowerCase()] ??
    "bg-gray-100 text-gray-700";

  return (
    <div
      className={`group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${className || ""}`}
    >
      {/* Image */}
      <Link href={`/recipes/${recipe.slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          {recipe.coverImageUrl ? (
            <img
              src={recipe.coverImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 opacity-20">
              <Users size={64} />
            </div>
          )}

          <button
            onClick={toggleSave}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md transition-all hover:scale-110 text-gray-400 hover:text-red-500"
          >
            <Heart
              size={20}
              className={
                isSaved ? "fill-red-500 text-red-500" : "text-gray-400"
              }
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title + Difficulty */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-lg line-clamp-1 text-gray-900 dark:text-white">
              {recipe.title}
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${difficultyClass}`}
            >
              {recipe.difficulty}
            </span>
          </div>

          {/* Category */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {recipe.category}
          </p>

          {/* Time + Rating */}
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{recipe.rating?.toFixed(1)}</span>
              <span className="text-gray-400">({recipe.ratingCount})</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {recipe.dietaryTags?.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Admin Actions Overlay */}
      {variant === "manage" && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit?.(recipe)}
            className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-gray-700"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete?.(recipe.id)}
            className="p-2 hover:bg-red-50 rounded-xl transition-colors text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
