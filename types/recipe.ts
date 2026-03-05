export type DietaryTag =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "dairy-free"
  | "keto"
  | "paleo"
  | "nut-free"
  | "low-carb";

export type Difficulty = "easy" | "medium" | "hard";

export type MeasurementUnit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "tsp"
  | "tbsp"
  | "cup"
  | "piece"
  | "pinch"
  | "to taste";

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: MeasurementUnit;
  optional: boolean;
}

export interface RecipeStep {
  stepNumber: number;
  instruction: string;
  durationMinutes?: number; // optional timer for this step
  tip?: string;
}

export interface Nutrition {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
}

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl?: string;
  authorId: string;
  category: string; // e.g., "Breakfast", "Dinner", "Dessert"
  dietaryTags: DietaryTag[];
  difficulty: Difficulty;
  servings: number; // base serving count
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition?: Nutrition; // per serving
  published: boolean;
  rating: number; // average user rating, 0–5
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeFilters {
  category: string;
  dietaryTags: DietaryTag[];
  difficulty: Difficulty | "all";
  search: string;
  maxCookTime: number | null; // minutes
  published: boolean | null;
}
