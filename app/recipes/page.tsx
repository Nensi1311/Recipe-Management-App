import { Recipe } from "@/types/recipe";
import RecipesClient from "./RecipesClient";

export default async function RecipesPage() {
  let recipes: Recipe[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/recipes?published=true`, {
      cache: "no-store",
    });
    if (res.ok) {
      recipes = await res.json();
    }
  } catch {
    // Will use empty array, client will re-fetch
  }

  return <RecipesClient initialRecipes={recipes} />;
}
