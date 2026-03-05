import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { RecipeFilters } from "@/types/recipe";

export const useFilteredRecipes = () => {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const filters = useSelector((state: RootState) => state.recipes.filters);

  const filteredRecipes = recipes.filter((recipe) => {
    // Category filter
    if (filters.category !== "all" && recipe.category !== filters.category) {
      return false;
    }

    // Dietary tags filter (must have ALL selected tags)
    if (
      filters.dietaryTags.length > 0 &&
      !filters.dietaryTags.every((tag) => recipe.dietaryTags.includes(tag))
    ) {
      return false;
    }

    // Difficulty filter
    if (
      filters.difficulty !== "all" &&
      recipe.difficulty !== filters.difficulty
    ) {
      return false;
    }

    // Search filter (title or description)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesTitle = recipe.title.toLowerCase().includes(searchLower);
      const matchesDesc = recipe.description
        .toLowerCase()
        .includes(searchLower);
      if (!matchesTitle && !matchesDesc) return false;
    }

    // Max Cook Time filter
    if (filters.maxCookTime !== null) {
      const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
      if (totalTime > filters.maxCookTime) return false;
    }

    // Published filter
    if (filters.published !== null && recipe.published !== filters.published) {
      return false;
    }

    return true;
  });

  // Derive categories from the full un-filtered recipe list
  const categories = Array.from(new Set(recipes.map((r) => r.category)));

  return {
    filteredRecipes,
    count: filteredRecipes.length,
    categories,
  };
};
