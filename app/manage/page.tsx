import { Recipe } from "@/types/recipe";
import { ManageDashboardClient } from "@/components/ManageDashboardClient";

async function getAllRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/recipes`, { cache: "no-store" });
    return res.json();
  } catch {
    return [];
  }
}

export default async function ManagePage() {
  const recipes = await getAllRecipes();
  return <ManageDashboardClient initialRecipes={recipes} />;
}
