import { NextRequest, NextResponse } from "next/server";
import { getRecipes, saveRecipes } from "@/lib/db";
import { Recipe } from "@/types/recipe";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const recipes = await getRecipes();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const recipes = await getRecipes();
    const index = recipes.findIndex((r) => r.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const updatedRecipe: Recipe = {
      ...recipes[index],
      ...body,
      id, // Ensure ID remains the same
      updatedAt: new Date().toISOString(),
    };

    recipes[index] = updatedRecipe;
    await saveRecipes(recipes);

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const recipes = await getRecipes();
  const initialLength = recipes.length;
  const filteredRecipes = recipes.filter((r) => r.id !== id);

  if (filteredRecipes.length === initialLength) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  await saveRecipes(filteredRecipes);
  return NextResponse.json({ success: true });
}
