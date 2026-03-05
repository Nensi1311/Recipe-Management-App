import { NextRequest, NextResponse } from "next/server";
import { getAllRecipes, addRecipe } from "@/lib/recipeStore";
import { DietaryTag, Difficulty, Recipe } from "@/types/recipe";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const dietaryTagsParam = searchParams.get("dietaryTags");
  const difficulty = searchParams.get("difficulty");
  const search = searchParams.get("search");
  const maxCookTime = searchParams.get("maxCookTime");
  const published = searchParams.get("published");

  let recipes = getAllRecipes();

  if (published !== null) {
    recipes = recipes.filter((r) => r.published === (published === "true"));
  }

  if (category) {
    recipes = recipes.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase(),
    );
  }

  if (dietaryTagsParam) {
    const tags = dietaryTagsParam.split(",") as DietaryTag[];
    recipes = recipes.filter((r) =>
      tags.every((tag) => r.dietaryTags.includes(tag)),
    );
  }

  if (difficulty) {
    recipes = recipes.filter((r) => r.difficulty === difficulty);
  }

  if (search) {
    const term = search.toLowerCase();
    recipes = recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(term) ||
        r.description.toLowerCase().includes(term) ||
        r.category.toLowerCase().includes(term),
    );
  }

  if (maxCookTime) {
    const max = parseInt(maxCookTime, 10);
    if (!isNaN(max)) {
      recipes = recipes.filter((r) => r.cookTimeMinutes <= max);
    }
  }

  return NextResponse.json(recipes);
}

interface CreateRecipeBody {
  title: string;
  description: string;
  coverImageUrl: string;
  authorId: string;
  category: string;
  dietaryTags: DietaryTag[];
  difficulty: Difficulty;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: Recipe["ingredients"];
  steps: Recipe["steps"];
  nutrition: Recipe["nutrition"];
  published: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateRecipeBody;

    // Validation
    const errors: string[] = [];
    if (!body.title || body.title.length < 3)
      errors.push("Title must be at least 3 characters");
    if (!body.ingredients || body.ingredients.length < 1)
      errors.push("At least 1 ingredient required");
    if (!body.steps || body.steps.length < 1)
      errors.push("At least 1 step required");
    if (!body.servings || body.servings < 1)
      errors.push("Servings must be at least 1");
    if (body.prepTimeMinutes === undefined || body.prepTimeMinutes < 0)
      errors.push("Prep time must be >= 0");
    if (body.cookTimeMinutes === undefined || body.cookTimeMinutes < 0)
      errors.push("Cook time must be >= 0");

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const recipe = addRecipe({
      title: body.title,
      description: body.description || "",
      coverImageUrl: body.coverImageUrl || "",
      authorId: body.authorId || "anonymous",
      category: body.category || "Uncategorized",
      dietaryTags: body.dietaryTags || [],
      difficulty: body.difficulty || Difficulty.Easy,
      servings: body.servings,
      prepTimeMinutes: body.prepTimeMinutes,
      cookTimeMinutes: body.cookTimeMinutes,
      ingredients: body.ingredients,
      steps: body.steps,
      nutrition: body.nutrition || {
        calories: 0,
        proteinG: 0,
        carbsG: 0,
        fatG: 0,
        fiberG: 0,
      },
      published: body.published ?? false,
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
