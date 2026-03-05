"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setFilters, clearFilters } from "@/store/recipeSlice";
import { DietaryTag, Difficulty, RecipeFilters } from "@/types/recipe";
import { Search, X, Filter } from "lucide-react";
import clsx from "clsx";

interface RecipeFiltersBarProps {
  categories: string[];
}

export default function RecipeFiltersBar({
  categories,
}: RecipeFiltersBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.recipes.filters);

  const activeFilterCount = [
    filters.category,
    filters.difficulty,
    filters.search,
    filters.maxCookTime !== null,
    filters.dietaryTags.length > 0,
  ].filter(Boolean).length;

  const handleChange = (partial: Partial<RecipeFilters>) => {
    dispatch(setFilters(partial));
  };

  const handleTagToggle = (tag: DietaryTag) => {
    const current = filters.dietaryTags;
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    handleChange({ dietaryTags: updated });
  };

  return (
    <div className="space-y-4 p-5 rounded bg-gray-800 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-purple-400" />
          <h3 className="font-semibold text-white">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded bg-purple-500 text-white text-xs font-bold">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleChange({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2.5 rounded bg-gray-700 border border-gray-600 text-white text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="Search recipes..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 block">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleChange({ category: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 block">
          Difficulty
        </label>
        <select
          value={filters.difficulty}
          onChange={(e) => handleChange({ difficulty: e.target.value })}
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
        >
          <option value="">All Difficulties</option>
          {Object.values(Difficulty).map((d) => (
            <option key={d} value={d}>
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Dietary Tags */}
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 block">
          Dietary Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(DietaryTag).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={clsx(
                "px-3 py-1 rounded text-xs font-medium transition-colors",
                filters.dietaryTags.includes(tag)
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Max Cook Time */}
      <div>
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5 block">
          Max Cook Time (min)
        </label>
        <input
          type="number"
          min={0}
          value={filters.maxCookTime ?? ""}
          onChange={(e) =>
            handleChange({
              maxCookTime: e.target.value ? parseInt(e.target.value) : null,
            })
          }
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white text-sm placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          placeholder="No limit"
        />
      </div>
    </div>
  );
}
