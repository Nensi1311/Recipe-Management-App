"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilters, clearFilters } from "@/store/recipeSlice";
import { useFilteredRecipes } from "@/hooks/useFilteredRecipes";
import { Search, X, Clock, Layers, Zap } from "lucide-react";
import { DietaryTag, Difficulty } from "@/types/recipe";

export const RecipeFiltersBar = ({ className }: { className?: string }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.recipes);
  const { categories, count } = useFilteredRecipes();

  const dietaryTags: DietaryTag[] = [
    "vegan",
    "vegetarian",
    "gluten-free",
    "dairy-free",
    "keto",
    "paleo",
    "nut-free",
  ];

  const handleTagToggle = (tag: DietaryTag) => {
    const newTags = filters.dietaryTags.includes(tag)
      ? filters.dietaryTags.filter((t) => t !== tag)
      : [...filters.dietaryTags, tag];
    dispatch(setFilters({ dietaryTags: newTags }));
  };

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.category !== "all" ? 1 : 0) +
    (filters.difficulty !== "all" ? 1 : 0) +
    filters.dietaryTags.length +
    (filters.maxCookTime !== null ? 1 : 0);

  return (
    <div
      className={`bg-card rounded-xl border border-border p-6 shadow-sm ${className || ""}`}
    >
      {/* Search and Clear */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search recipes, ingredients, or methods..."
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all placeholder:text-text-muted/50"
          />
        </div>
        <button
          onClick={() => dispatch(clearFilters())}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-background border border-border text-text-muted font-bold hover:bg-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={activeFilterCount === 0}
        >
          <X size={18} /> Clear Filters
        </button>
      </div>

      {/* Dropdowns and Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div>
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted mb-3">
            <Layers size={14} className="text-primary" /> Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm font-semibold cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
          >
            <option value="all">Every Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted mb-3">
            <Zap size={14} className="text-accent" /> Difficulty
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) =>
              dispatch(
                setFilters({
                  difficulty: e.target.value as Difficulty | "all",
                }),
              )
            }
            className="w-full p-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm font-semibold cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
          >
            <option value="all">Any Difficulty</option>
            <option value="easy">Easy Peasy</option>
            <option value="medium">Medium</option>
            <option value="hard">Master Chef</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-muted">
              <Clock size={14} className="text-secondary" /> Max Time
            </label>
            <span className="text-sm font-black text-primary tabular-nums">
              {filters.maxCookTime ? `${filters.maxCookTime}m` : "Any"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            step="15"
            value={filters.maxCookTime || 180}
            onChange={(e) =>
              dispatch(
                setFilters({
                  maxCookTime:
                    parseInt(e.target.value) === 180
                      ? null
                      : parseInt(e.target.value),
                }),
              )
            }
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Dietary Tags */}
      <div>
        <label className="text-xs font-black uppercase tracking-widest text-text-muted block mb-4">
          Dietary Requirements
        </label>
        <div className="flex flex-wrap gap-2">
          {dietaryTags.map((tag) => {
            const isActive = filters.dietaryTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                  isActive
                    ? "bg-secondary border-secondary text-white shadow-md shadow-secondary/20"
                    : "bg-background border-border text-text-muted hover:border-secondary/50"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest">
        <span className="text-text-muted">
          Found <span className="text-primary text-sm font-black">{count}</span>{" "}
          Delicious recipes
        </span>
        {activeFilterCount > 0 && (
          <span className="text-white px-3 py-1 bg-accent rounded-full animate-pulse">
            {activeFilterCount} filters active
          </span>
        )}
      </div>
    </div>
  );
};
