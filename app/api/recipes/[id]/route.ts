import { NextRequest, NextResponse } from "next/server";
import { getRecipeById, updateRecipe, deleteRecipe } from "@/lib/recipeStore";
import { Recipe } from "@/types/recipe";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  return NextResponse.json(recipe);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = (await request.json()) as Partial<
      Omit<Recipe, "id" | "createdAt">
    >;
    const updated = updateRecipe(id, body);
    if (!updated) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const success = deleteRecipe(id);
  if (!success) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Recipe deleted" });
}
