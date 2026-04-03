import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Recipe } from "@/types/recipe";

interface FilteredResult {
  filteredRecipes: Recipe[];
  count: number;
  categories: string[];
}

export function useFilteredRecipes(): FilteredResult {
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const filters = useSelector((state: RootState) => state.recipes.filters);

  const categories = useMemo(
    () => Array.from(new Set(recipes.map((r) => r.category))).sort(),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (filters.category && recipe.category !== filters.category) return false;
      if (
        filters.dietaryTags.length > 0 &&
        !filters.dietaryTags.every((tag) => recipe.dietaryTags.includes(tag))
      )
        return false;
      if (filters.difficulty !== "all" && recipe.difficulty !== filters.difficulty) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !recipe.title.toLowerCase().includes(q) &&
          !recipe.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.maxCookTime !== null) {
        if (recipe.prepTimeMinutes + recipe.cookTimeMinutes > filters.maxCookTime) return false;
      }
      if (filters.published !== null && recipe.published !== filters.published) return false;
      return true;
    });
  }, [recipes, filters]);

  return { filteredRecipes, count: filteredRecipes.length, categories };
}
