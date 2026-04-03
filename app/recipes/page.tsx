import { Recipe } from "@/types/recipe";
import { RecipeBrowseClient } from "@/components/RecipeBrowseClient";

async function getPublishedRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/recipes?published=true`, { cache: "no-store" });
    return res.json();
  } catch {
    return [];
  }
}

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();
  return <RecipeBrowseClient initialRecipes={recipes} />;
}
