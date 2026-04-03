import { Recipe } from "@/types/recipe";
import { ManageDashboardClient } from "@/components/ManageDashboardClient";

import { getRecipes } from "@/lib/data";

async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const recipes = getRecipes();
    return recipes.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export default async function ManagePage() {
  const recipes = await getAllRecipes();
  return <ManageDashboardClient initialRecipes={recipes} />;
}
