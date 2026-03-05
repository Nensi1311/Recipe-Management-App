import { NextRequest, NextResponse } from "next/server";
import { getRecipes, saveRecipes, slugify } from "@/lib/db";
import { Recipe, DietaryTag, Difficulty } from "@/types/recipe";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const dietaryTags = searchParams
    .get("dietaryTags")
    ?.split(",")
    .filter(Boolean) as DietaryTag[];
  const difficulty = searchParams.get("difficulty");
  const search = searchParams.get("search")?.toLowerCase();
  const maxCookTime = searchParams.get("maxCookTime");
  const published = searchParams.get("published");
  const slug = searchParams.get("slug");

  let recipes = await getRecipes();

  // Filter by slug (for detail page)
  if (slug) {
    const recipe = recipes.find((r) => r.slug === slug);
    return NextResponse.json(recipe ? [recipe] : []);
  }

  // General filters
  if (category && category !== "all") {
    recipes = recipes.filter((r) => r.category === category);
  }

  if (dietaryTags && dietaryTags.length > 0) {
    recipes = recipes.filter((r) =>
      dietaryTags.every((tag) => r.dietaryTags.includes(tag)),
    );
  }

  if (difficulty && difficulty !== "all") {
    recipes = recipes.filter((r) => r.difficulty === difficulty);
  }

  if (search) {
    recipes = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search),
    );
  }

  if (maxCookTime) {
    const maxTime = parseInt(maxCookTime);
    recipes = recipes.filter(
      (r) => r.prepTimeMinutes + r.cookTimeMinutes <= maxTime,
    );
  }

  if (published !== null) {
    const isPublished = published === "true";
    recipes = recipes.filter((r) => r.published === isPublished);
  }

  // Sort by createdAt descending
  recipes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const recipes = await getRecipes();

    // Validation
    if (!body.title || body.title.length < 3)
      return NextResponse.json({ error: "Title min 3 chars" }, { status: 400 });
    if (!body.ingredients || body.ingredients.length < 1)
      return NextResponse.json(
        { error: "At least 1 ingredient" },
        { status: 400 },
      );
    if (!body.steps || body.steps.length < 1)
      return NextResponse.json({ error: "At least 1 step" }, { status: 400 });
    if (body.servings < 1)
      return NextResponse.json({ error: "Servings >= 1" }, { status: 400 });
    if (body.prepTimeMinutes < 0)
      return NextResponse.json({ error: "Prep time >= 0" }, { status: 400 });
    if (body.cookTimeMinutes < 0)
      return NextResponse.json({ error: "Cook time >= 0" }, { status: 400 });

    const newRecipe: Recipe = {
      ...body,
      id: crypto.randomUUID(),
      slug: slugify(body.title),
      rating: 0,
      ratingCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ensure slug uniqueness
    let finalSlug = newRecipe.slug;
    let counter = 1;
    while (recipes.some((r) => r.slug === finalSlug)) {
      finalSlug = `${newRecipe.slug}-${counter++}`;
    }
    newRecipe.slug = finalSlug;

    recipes.push(newRecipe);
    await saveRecipes(recipes);

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
