"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearFilters, setFilters } from "@/store/recipeSlice";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { DietaryTag, Difficulty } from "@/types/recipe";

const ALL_DIETARY_TAGS: DietaryTag[] = [
  "vegan", "vegetarian", "gluten-free", "dairy-free", "keto", "paleo", "nut-free",
];

interface RecipeFiltersBarProps {
  className?: string;
}

export function RecipeFiltersBar({ className = "" }: RecipeFiltersBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((s: RootState) => s.recipes.filters);
  const { categories } = useFilteredRecipes();

  const activeCount = [
    filters.category !== "",
    filters.dietaryTags.length > 0,
    filters.difficulty !== "all",
    filters.search !== "",
    filters.maxCookTime !== null,
  ].filter(Boolean).length;

  const toggleTag = (tag: DietaryTag) => {
    const tags = filters.dietaryTags.includes(tag)
      ? filters.dietaryTags.filter((t) => t !== tag)
      : [...filters.dietaryTags, tag];
    dispatch(setFilters({ dietaryTags: tags }));
  };

  return (
    <div className={`bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 text-xs font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-xs text-stone-500 hover:text-red-500 transition-colors font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            placeholder="Search recipes..."
            className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1.5">Category</label>
          <select
            value={filters.category}
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            className="w-full px-3 py-2 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1.5">Difficulty</label>
          <div className="flex gap-2">
            {(["all", "easy", "medium", "hard"] as (Difficulty | "all")[]).map((d) => (
              <button
                key={d}
                onClick={() => dispatch(setFilters({ difficulty: d }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                  filters.difficulty === d
                    ? "bg-brand-500 text-white"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Max Cook Time */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1.5">
            Max Total Time: {filters.maxCookTime ? `${filters.maxCookTime} min` : "Any"}
          </label>
          <input
            type="range"
            min={15}
            max={300}
            step={15}
            value={filters.maxCookTime ?? 300}
            onChange={(e) => dispatch(setFilters({ maxCookTime: parseInt(e.target.value) === 300 ? null : parseInt(e.target.value) }))}
            className="w-full accent-brand-500"
          />
        </div>

        {/* Dietary Tags */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1.5">Dietary</label>
          <div className="flex flex-wrap gap-1.5">
            {ALL_DIETARY_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all duration-150 ${
                  filters.dietaryTags.includes(tag)
                    ? "bg-sage-500 text-white border-sage-500"
                    : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-sage-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
