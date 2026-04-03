import { notFound } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { RecipeDetailClient } from "@/components/RecipeDetailClient";

import { getRecipeBySlug as fetchRecipeBySlug } from "@/lib/data";

async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    return fetchRecipeBySlug(slug) || null;
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
