import { notFound } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { RecipeDetailClient } from "@/components/RecipeDetailClient";

async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/recipes?slug=${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

export default async function RecipeDetailPage({ params }: { params: { slug: string } }) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe || !recipe.published) {
    notFound();
  }

  return <RecipeDetailClient recipe={recipe} />;
}
