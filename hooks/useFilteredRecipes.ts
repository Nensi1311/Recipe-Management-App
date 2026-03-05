import { useMemo } from "react";
import { Recipe, RecipeFilters, DietaryTag } from "@/types/recipe";

interface FilteredResult {
  filteredRecipes: Recipe[];
  count: number;
  categories: string[];
}

export function useFilteredRecipes(
  recipes: Recipe[],
  filters: RecipeFilters,
): FilteredResult {
  return useMemo(() => {
    let result = [...recipes];

    // Category filter
    if (filters.category) {
      result = result.filter(
        (r) => r.category.toLowerCase() === filters.category.toLowerCase(),
      );
    }

    // Dietary tags filter
    if (filters.dietaryTags && filters.dietaryTags.length > 0) {
      result = result.filter((r) =>
        filters.dietaryTags.every((tag: DietaryTag) =>
          r.dietaryTags.includes(tag),
        ),
      );
    }

    // Difficulty filter
    if (filters.difficulty) {
      result = result.filter((r) => r.difficulty === filters.difficulty);
    }

    // Search filter
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.category.toLowerCase().includes(term),
      );
    }

    // Max cook time filter
    if (filters.maxCookTime !== null && filters.maxCookTime !== undefined) {
      result = result.filter((r) => r.cookTimeMinutes <= filters.maxCookTime!);
    }

    // Published filter
    if (filters.published !== null && filters.published !== undefined) {
      result = result.filter((r) => r.published === filters.published);
    }

    // Extract unique categories from ALL recipes (not filtered)
    const categories = [...new Set(recipes.map((r) => r.category))].sort();

    return {
      filteredRecipes: result,
      count: result.length,
      categories,
    };
  }, [recipes, filters]);
}
