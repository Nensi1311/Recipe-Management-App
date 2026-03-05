import fs from "fs/promises";
import path from "path";
import { Recipe } from "@/types/recipe";

const DB_PATH = path.join(process.cwd(), "data", "recipes.json");

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return initial empty array or create it
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
    return INITIAL_DATA;
  }
}

export async function saveRecipes(recipes: Recipe[]): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(recipes, null, 2));
}

export const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
};

const INITIAL_DATA: Recipe[] = [
  {
    id: "1",
    slug: "avocado-toast-deluxe",
    title: "Avocado Toast Deluxe",
    description:
      "A premium take on the classic avocado toast with poached eggs and chili flakes.",
    category: "Breakfast",
    dietaryTags: ["vegetarian", "low-carb"],
    difficulty: "easy",
    coverImageUrl:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop",
    authorId: "admin",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 5,
    ingredients: [
      {
        id: "1-1",
        name: "Sourdough Bread",
        quantity: 2,
        unit: "piece",
        optional: false,
      },
      {
        id: "1-2",
        name: "Avocado",
        quantity: 1,
        unit: "piece",
        optional: false,
      },
      { id: "1-3", name: "Eggs", quantity: 2, unit: "piece", optional: false },
      {
        id: "1-4",
        name: "Chili Flakes",
        quantity: 1,
        unit: "tsp",
        optional: true,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Toast the sourdough bread until golden brown.",
        durationMinutes: 2,
      },
      {
        stepNumber: 2,
        instruction:
          "Mash the avocado in a bowl with a pinch of salt and lime.",
        durationMinutes: 3,
        tip: "Add a drop of olive oil for extra creaminess.",
      },
      {
        stepNumber: 3,
        instruction: "Poach the eggs in simmering water for 3 minutes.",
        durationMinutes: 3,
      },
      {
        stepNumber: 4,
        instruction: "Assemble the toast and sprinkle with chili flakes.",
        durationMinutes: 1,
      },
    ],
    nutrition: { calories: 350, proteinG: 12, carbsG: 25, fatG: 22, fiberG: 8 },
    published: true,
    rating: 4.8,
    ratingCount: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "spicy-quinoa-bowl",
    title: "Spicy Quinoa Bowl",
    description:
      "Nourishing bowl with roasted veggies and a spicy tahini dressing.",
    category: "Lunch",
    dietaryTags: ["vegan", "gluten-free", "keto"],
    difficulty: "medium",
    coverImageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    authorId: "admin",
    servings: 1,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    ingredients: [
      {
        id: "2-1",
        name: "Quinoa",
        quantity: 0.5,
        unit: "cup",
        optional: false,
      },
      {
        id: "2-2",
        name: "Sweet Potato",
        quantity: 1,
        unit: "piece",
        optional: false,
      },
      { id: "2-3", name: "Kale", quantity: 2, unit: "cup", optional: false },
      { id: "2-4", name: "Tahini", quantity: 2, unit: "tbsp", optional: false },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Cook quinoa according to package instructions.",
        durationMinutes: 15,
      },
      {
        stepNumber: 2,
        instruction: "Roast diced sweet potato at 200°C.",
        durationMinutes: 20,
      },
      {
        stepNumber: 3,
        instruction: "Massage kale with olive oil and salt.",
        durationMinutes: 2,
      },
      {
        stepNumber: 4,
        instruction: "Mix tahini with lemon juice and sriracha for dressing.",
        durationMinutes: 2,
      },
    ],
    nutrition: {
      calories: 450,
      proteinG: 15,
      carbsG: 55,
      fatG: 18,
      fiberG: 12,
    },
    published: true,
    rating: 4.5,
    ratingCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
