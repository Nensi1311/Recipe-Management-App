import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, updateRecipe } from "@/lib/data";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const existing = getRecipeById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json() as { rating: number };
  const { rating } = body;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be an integer between 1 and 5" }, { status: 400 });
  }

  const newCount = existing.ratingCount + 1;
  const newRating = Math.round(((existing.rating * existing.ratingCount + rating) / newCount) * 10) / 10;

  updateRecipe(params.id, {
    rating: newRating,
    ratingCount: newCount,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ rating: newRating, ratingCount: newCount });
}
