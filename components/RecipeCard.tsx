"use client";

import React from "react";
import { Recipe, Difficulty } from "@/types/recipe";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { Clock, Star, Heart, Edit2, Trash2 } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "public" | "manage";
  onEdit?: (recipe: Recipe) => void;
  onDelete?: (recipe: Recipe) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  [Difficulty.Easy]: "bg-emerald-500/20 text-emerald-400",
  [Difficulty.Medium]: "bg-amber-500/20 text-amber-400",
  [Difficulty.Hard]: "bg-rose-500/20 text-rose-400",
};

export default function RecipeCard({
  recipe,
  variant = "public",
  onEdit,
  onDelete,
}: RecipeCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const savedIds = useSelector((state: RootState) => state.cookbook.savedIds);
  const isSaved = savedIds.includes(recipe.id);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved) {
      dispatch(unsaveRecipe(recipe.id));
    } else {
      dispatch(saveRecipe(recipe.id));
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(recipe);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(recipe);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={clsx(
          i < Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "text-gray-600",
        )}
      />
    ));
  };

  return (
    <div className="group relative rounded overflow-hidden bg-gray-800 border border-gray-700 hover:border-gray-500">
      <Link href={`/recipes/${recipe.slug}`} className="block">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gray-900 flex items-center justify-center border-b border-gray-700">
          {recipe.coverImageUrl ? (
            <img
              src={recipe.coverImageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600">
              <span className="text-4xl font-bold opacity-20">
                {recipe.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Manage mode badge */}
          {variant === "manage" && (
            <span
              className={clsx(
                "absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold",
                recipe.published
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-600 text-white",
              )}
            >
              {recipe.published ? "Published" : "Draft"}
            </span>
          )}

          {/* Dietary Tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {recipe.dietaryTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-800 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
              {recipe.category}
            </span>
            <span
              className={clsx(
                "px-2 py-0.5 rounded text-[10px] font-semibold",
                difficultyColors[recipe.difficulty],
              )}
            >
              {recipe.difficulty}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400">
            {recipe.title}
          </h3>

          <div className="flex items-center justify-between border-t border-gray-700 pt-3 mt-3">
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Clock size={14} />
              <span>{totalTime} min</span>
            </div>

            <div className="flex items-center gap-1">
              {renderStars(recipe.rating)}
              <span className="text-xs text-gray-500 ml-1">
                ({recipe.ratingCount})
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Interactive Overlay Buttons - outside the main Link to avoid nesting <a> tags */}
      {/* Save Button */}
      <button
        onClick={handleSaveToggle}
        className={clsx(
          "absolute top-3 right-3 p-2 rounded z-10",
          isSaved
            ? "bg-rose-600 text-white"
            : "bg-gray-900/80 text-gray-300 hover:text-white",
        )}
      >
        <Heart size={18} className={clsx(isSaved && "fill-current")} />
      </button>

      {/* Manage variant buttons */}
      {variant === "manage" && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mt-0 pt-3 border-t border-gray-700">
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 text-sm font-medium"
            >
              <Edit2 size={14} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-gray-700 text-rose-400 hover:bg-gray-600 text-sm font-medium"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
