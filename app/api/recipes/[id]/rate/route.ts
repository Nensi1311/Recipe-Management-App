import { NextRequest, NextResponse } from "next/server";
import { getRecipes, saveRecipes } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { rating } = await request.json();

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be 1-5" },
        { status: 400 },
      );
    }

    const recipes = await getRecipes();
    const index = recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const recipe = recipes[index];
    const totalRatingValue = recipe.rating * recipe.ratingCount + rating;
    const newRatingCount = recipe.ratingCount + 1;
    const newRating = Number((totalRatingValue / newRatingCount).toFixed(1));

    recipe.rating = newRating;
    recipe.ratingCount = newRatingCount;
    recipe.updatedAt = new Date().toISOString();

    recipes[index] = recipe;
    await saveRecipes(recipes);

    return NextResponse.json({
      rating: recipe.rating,
      ratingCount: recipe.ratingCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
