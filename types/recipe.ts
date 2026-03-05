// ── Enums / Union Types ──────────────────────────────────────

export enum DietaryTag {
  Vegan = "vegan",
  Vegetarian = "vegetarian",
  GlutenFree = "gluten-free",
  DairyFree = "dairy-free",
  Keto = "keto",
  Paleo = "paleo",
  NutFree = "nut-free",
  LowCarb = "low-carb",
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum MeasurementUnit {
  Gram = "g",
  Kilogram = "kg",
  Milliliter = "ml",
  Liter = "l",
  Teaspoon = "tsp",
  Tablespoon = "tbsp",
  Cup = "cup",
  Ounce = "oz",
  Pound = "lb",
  FluidOunce = "fl oz",
  Piece = "piece",
  Pinch = "pinch",
  Whole = "whole",
}

// ── Interfaces ───────────────────────────────────────────────

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
  durationMinutes: number;
  tip: string;
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
  coverImageUrl: string;
  authorId: string;
  category: string;
  dietaryTags: DietaryTag[];
  difficulty: Difficulty;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition: Nutrition;
  published: boolean;
  rating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeFilters {
  category: string;
  dietaryTags: DietaryTag[];
  difficulty: string;
  search: string;
  maxCookTime: number | null;
  published: boolean | null;
}
