import { Recipe } from "@/types/recipe";
import { RecipeBrowseClient } from "@/components/RecipeBrowseClient";

import { getRecipes } from "@/lib/data";

async function getPublishedRecipes(): Promise<Recipe[]> {
  try {
    const recipes = getRecipes();
    const published = recipes.filter(r => r.published);
    return published.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();
  return <RecipeBrowseClient initialRecipes={recipes} />;
}
