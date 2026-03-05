import { useMemo } from "react";
import { Recipe, Ingredient, Nutrition } from "@/types/recipe";

interface ScaledResult {
  scaledIngredients: Ingredient[];
  scaledServings: number;
  scaledNutrition: Nutrition;
}

export function useRecipeScaler(
  recipe: Recipe | null,
  multiplier: number,
): ScaledResult {
  return useMemo(() => {
    if (!recipe) {
      return {
        scaledIngredients: [],
        scaledServings: 0,
        scaledNutrition: {
          calories: 0,
          proteinG: 0,
          carbsG: 0,
          fatG: 0,
          fiberG: 0,
        },
      };
    }

    const scaledIngredients: Ingredient[] = recipe.ingredients.map((ing) => ({
      ...ing,
      quantity: Math.round(ing.quantity * multiplier * 100) / 100,
    }));

    const scaledServings = Math.round(recipe.servings * multiplier * 100) / 100;

    const scaledNutrition: Nutrition = {
      calories: Math.round(recipe.nutrition.calories * multiplier),
      proteinG: Math.round(recipe.nutrition.proteinG * multiplier * 10) / 10,
      carbsG: Math.round(recipe.nutrition.carbsG * multiplier * 10) / 10,
      fatG: Math.round(recipe.nutrition.fatG * multiplier * 10) / 10,
      fiberG: Math.round(recipe.nutrition.fiberG * multiplier * 10) / 10,
    };

    return { scaledIngredients, scaledServings, scaledNutrition };
  }, [recipe, multiplier]);
}
