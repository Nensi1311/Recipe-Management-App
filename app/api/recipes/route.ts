import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addRecipe, generateSlug, getRecipes } from "@/lib/data";
import { DietaryTag, Recipe } from "@/types/recipe";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const dietaryTagsParam = searchParams.get("dietaryTags");
  const difficulty = searchParams.get("difficulty");
  const search = searchParams.get("search");
  const maxCookTime = searchParams.get("maxCookTime");
  const published = searchParams.get("published");
  const slug = searchParams.get("slug");

  let recipes = getRecipes();

  if (slug) {
    const found = recipes.find((r) => r.slug === slug);
    if (!found) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(found);
  }

  if (category) recipes = recipes.filter((r) => r.category === category);
  if (dietaryTagsParam) {
    const tags = dietaryTagsParam.split(",") as DietaryTag[];
    recipes = recipes.filter((r) => tags.every((t) => r.dietaryTags.includes(t)));
  }
  if (difficulty) recipes = recipes.filter((r) => r.difficulty === difficulty);
  if (search) {
    const q = search.toLowerCase();
    recipes = recipes.filter(
      (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)
    );
  }
  if (maxCookTime) {
    const max = parseInt(maxCookTime);
    recipes = recipes.filter((r) => r.prepTimeMinutes + r.cookTimeMinutes <= max);
  }
  if (published === "true") recipes = recipes.filter((r) => r.published);
  if (published === "false") recipes = recipes.filter((r) => !r.published);

  recipes = [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">;

  if (!body.title || body.title.length < 3) {
    return NextResponse.json({ error: "Title must be at least 3 characters" }, { status: 400 });
  }
  if (!body.ingredients || body.ingredients.length < 1) {
    return NextResponse.json({ error: "At least 1 ingredient required" }, { status: 400 });
  }
  if (!body.steps || body.steps.length < 1) {
    return NextResponse.json({ error: "At least 1 step required" }, { status: 400 });
  }
  if (!body.servings || body.servings < 1) {
    return NextResponse.json({ error: "Servings must be at least 1" }, { status: 400 });
  }
  if (body.prepTimeMinutes < 0) {
    return NextResponse.json({ error: "Prep time must be >= 0" }, { status: 400 });
  }
  if (body.cookTimeMinutes < 0) {
    return NextResponse.json({ error: "Cook time must be >= 0" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const newRecipe: Recipe = {
    ...body,
    id: uuidv4(),
    slug: generateSlug(body.title),
    rating: 0,
    ratingCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  addRecipe(newRecipe);
  return NextResponse.json(newRecipe, { status: 201 });
}
