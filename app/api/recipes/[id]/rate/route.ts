import { NextRequest, NextResponse } from "next/server";
import { rateRecipe } from "@/lib/recipeStore";

interface RouteParams {
  params: Promise<{ id: string }>;
}

interface RateBody {
  rating: number;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const body = (await request.json()) as RateBody;

    if (
      typeof body.rating !== "number" ||
      !Number.isInteger(body.rating) ||
      body.rating < 1 ||
      body.rating > 5
    ) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 },
      );
    }

    const result = rateRecipe(id, body.rating);
    if (!result) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
