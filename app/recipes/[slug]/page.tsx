import { getRecipes } from "@/lib/db";
import { RecipeDetailClient } from "@/app/recipes/[slug]/RecipeDetailClient";
import { notFound } from "next/navigation";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipes = await getRecipes();
  const recipe = recipes.find((r) => r.slug === slug);

  if (!recipe || !recipe.published) {
    notFound();
  }

  return (
    <div className="fade-in">
      <RecipeDetailClient recipe={recipe} />
    </div>
  );
}
