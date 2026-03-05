import { Recipe, Nutrition } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";

export const useRecipeScaler = (recipe: Recipe, multiplier: number) => {
  const { scaleIngredient } = useCooking();

  const scaledIngredients = recipe.ingredients.map((ing) => ({
    ...ing,
    quantity: scaleIngredient(ing.quantity),
  }));

  const scaledServings = recipe.servings * multiplier;

  const scaledNutrition: Nutrition | undefined = recipe.nutrition
    ? {
        calories: recipe.nutrition.calories * multiplier,
        proteinG: recipe.nutrition.proteinG * multiplier,
        carbsG: recipe.nutrition.carbsG * multiplier,
        fatG: recipe.nutrition.fatG * multiplier,
        fiberG: recipe.nutrition.fiberG * multiplier,
      }
    : undefined;

  return {
    scaledIngredients,
    scaledServings,
    scaledNutrition,
  };
};
