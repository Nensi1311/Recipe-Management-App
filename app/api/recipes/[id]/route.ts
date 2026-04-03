import { NextRequest, NextResponse } from "next/server";
import { deleteRecipe, generateSlug, getRecipeById, updateRecipe } from "@/lib/data";
import { Recipe } from "@/types/recipe";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const recipe = getRecipeById(params.id);
  if (!recipe) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const existing = getRecipeById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json() as Partial<Recipe>;
  const updates: Partial<Recipe> = { ...body, updatedAt: new Date().toISOString() };

  if (body.title && body.title !== existing.title) {
    updates.slug = generateSlug(body.title);
  }

  const updated = updateRecipe(params.id, updates);
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const success = deleteRecipe(params.id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
