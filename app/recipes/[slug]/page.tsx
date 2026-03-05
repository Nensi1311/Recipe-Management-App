import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/recipeStore";
import RecipeDetailClient from "./RecipeDetailClient";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  // We don't notFound() here anymore because the recipe might exist in the user's localStorage (Redux)
  // but not in the server's in-memory seed store.

  // Allow chefs to preview draft recipes if found on server
  if (recipe && !recipe.published) {
    const cookieStore = await cookies();
    const isChef = cookieStore.has("chef_token");
    if (!isChef) {
      notFound();
    }
  }

  return <RecipeDetailClient slug={slug} initialRecipe={recipe} />;
}
