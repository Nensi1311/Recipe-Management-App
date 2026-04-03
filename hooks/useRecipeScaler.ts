import { useCooking } from "@/context/CookingContext";
import { Ingredient, Nutrition, Recipe } from "@/types/recipe";

interface ScalerResult {
  scaledIngredients: Ingredient[];
  scaledServings: number;
  scaledNutrition: Nutrition | undefined;
}

export function useRecipeScaler(recipe: Recipe, multiplier: number): ScalerResult {
  const { scaleIngredient } = useCooking();

  const scaledIngredients: Ingredient[] = recipe.ingredients.map((ing) => ({
    ...ing,
    quantity: scaleIngredient(ing.quantity),
  }));

  const scaledServings = recipe.servings * multiplier;

  const scaledNutrition: Nutrition | undefined = recipe.nutrition
    ? {
        calories: Math.round(recipe.nutrition.calories * multiplier * 100) / 100,
        proteinG: Math.round(recipe.nutrition.proteinG * multiplier * 100) / 100,
        carbsG: Math.round(recipe.nutrition.carbsG * multiplier * 100) / 100,
        fatG: Math.round(recipe.nutrition.fatG * multiplier * 100) / 100,
        fiberG: Math.round(recipe.nutrition.fiberG * multiplier * 100) / 100,
      }
    : undefined;

  return { scaledIngredients, scaledServings, scaledNutrition };
}
