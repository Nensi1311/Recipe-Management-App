import { Recipe } from "@/types/recipe";

// In-memory store (resets on server restart, perfect for exam)
let recipes: Recipe[] = [
  {
    id: "1",
    title: "Golden Butter Croissants",
    slug: "golden-butter-croissants",
    description: "Flaky, buttery French croissants with a gorgeous golden crust. A weekend project worth every fold.",
    coverImageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800",
    authorId: "user-1",
    category: "Breakfast",
    dietaryTags: ["vegetarian"],
    difficulty: "hard",
    servings: 8,
    prepTimeMinutes: 120,
    cookTimeMinutes: 20,
    ingredients: [
      { id: "i1", name: "All-purpose flour", quantity: 500, unit: "g", optional: false },
      { id: "i2", name: "Unsalted butter", quantity: 300, unit: "g", optional: false },
      { id: "i3", name: "Whole milk", quantity: 200, unit: "ml", optional: false },
      { id: "i4", name: "Active dry yeast", quantity: 7, unit: "g", optional: false },
      { id: "i5", name: "Sugar", quantity: 50, unit: "g", optional: false },
      { id: "i6", name: "Salt", quantity: 10, unit: "g", optional: false },
    ],
    steps: [
      { stepNumber: 1, instruction: "Mix flour, yeast, sugar, and salt. Add warm milk and knead until smooth.", durationMinutes: 15, tip: "Dough should be slightly sticky but not wet" },
      { stepNumber: 2, instruction: "Refrigerate dough for 1 hour. Flatten butter into a rectangle.", durationMinutes: 60 },
      { stepNumber: 3, instruction: "Encase butter in dough and perform 3 letter folds with 30-min rests between each.", durationMinutes: 90 },
      { stepNumber: 4, instruction: "Roll out and cut triangles. Roll from base to tip. Proof for 2 hours.", durationMinutes: 120 },
      { stepNumber: 5, instruction: "Brush with egg wash and bake at 200°C until deep golden.", durationMinutes: 20, tip: "Steam in the oven for extra flakiness" },
    ],
    nutrition: { calories: 340, proteinG: 6, carbsG: 35, fatG: 20, fiberG: 1 },
    published: true,
    rating: 4.8,
    ratingCount: 124,
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "2",
    title: "Smoky Black Bean Tacos",
    slug: "smoky-black-bean-tacos",
    description: "Hearty vegan tacos packed with chipotle-spiced black beans, mango salsa, and avocado cream.",
    coverImageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    authorId: "user-1",
    category: "Dinner",
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    difficulty: "easy",
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    ingredients: [
      { id: "i7", name: "Black beans (cooked)", quantity: 400, unit: "g", optional: false },
      { id: "i8", name: "Corn tortillas", quantity: 8, unit: "piece", optional: false },
      { id: "i9", name: "Chipotle in adobo", quantity: 2, unit: "tbsp", optional: false },
      { id: "i10", name: "Ripe mango", quantity: 1, unit: "piece", optional: false },
      { id: "i11", name: "Avocado", quantity: 2, unit: "piece", optional: false },
      { id: "i12", name: "Lime juice", quantity: 2, unit: "tbsp", optional: false },
      { id: "i13", name: "Fresh cilantro", quantity: 1, unit: "cup", optional: true },
    ],
    steps: [
      { stepNumber: 1, instruction: "Blend chipotle with 1 tbsp oil. Toss with black beans and cook in skillet for 8 min.", durationMinutes: 10 },
      { stepNumber: 2, instruction: "Dice mango, red onion, cilantro, and lime juice to make salsa.", durationMinutes: 5 },
      { stepNumber: 3, instruction: "Mash avocado with lime juice, salt, and garlic powder.", durationMinutes: 3 },
      { stepNumber: 4, instruction: "Warm tortillas on a dry skillet. Assemble with beans, salsa, and avocado cream.", durationMinutes: 5 },
    ],
    nutrition: { calories: 420, proteinG: 14, carbsG: 58, fatG: 16, fiberG: 12 },
    published: true,
    rating: 4.5,
    ratingCount: 89,
    createdAt: new Date("2024-02-10").toISOString(),
    updatedAt: new Date("2024-02-10").toISOString(),
  },
  {
    id: "3",
    title: "Lemon Ricotta Pancakes",
    slug: "lemon-ricotta-pancakes",
    description: "Cloud-light pancakes with fresh ricotta and lemon zest. Serve with blueberry compote for a perfect brunch.",
    coverImageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    authorId: "user-1",
    category: "Breakfast",
    dietaryTags: ["vegetarian"],
    difficulty: "easy",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    ingredients: [
      { id: "i14", name: "Ricotta cheese", quantity: 200, unit: "g", optional: false },
      { id: "i15", name: "All-purpose flour", quantity: 100, unit: "g", optional: false },
      { id: "i16", name: "Eggs", quantity: 2, unit: "piece", optional: false },
      { id: "i17", name: "Lemon zest", quantity: 1, unit: "tbsp", optional: false },
      { id: "i18", name: "Baking powder", quantity: 1, unit: "tsp", optional: false },
      { id: "i19", name: "Sugar", quantity: 2, unit: "tbsp", optional: false },
      { id: "i20", name: "Blueberries", quantity: 150, unit: "g", optional: true },
    ],
    steps: [
      { stepNumber: 1, instruction: "Whisk ricotta, eggs, lemon zest, and sugar together.", durationMinutes: 3 },
      { stepNumber: 2, instruction: "Fold in flour and baking powder until just combined. Don't overmix.", durationMinutes: 2, tip: "Lumps are okay!" },
      { stepNumber: 3, instruction: "Cook on buttered medium-low skillet until bubbles form. Flip and cook 2 more min.", durationMinutes: 10 },
      { stepNumber: 4, instruction: "Simmer blueberries with sugar and lemon juice for compote.", durationMinutes: 8 },
    ],
    nutrition: { calories: 480, proteinG: 22, carbsG: 54, fatG: 18, fiberG: 3 },
    published: true,
    rating: 4.9,
    ratingCount: 201,
    createdAt: new Date("2024-03-05").toISOString(),
    updatedAt: new Date("2024-03-05").toISOString(),
  },
  {
    id: "4",
    title: "Classic Beef Bolognese",
    slug: "classic-beef-bolognese",
    description: "A slow-simmered Italian meat sauce with rich tomatoes and aromatics. Best made the day before.",
    coverImageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    authorId: "user-1",
    category: "Dinner",
    dietaryTags: [],
    difficulty: "medium",
    servings: 6,
    prepTimeMinutes: 20,
    cookTimeMinutes: 180,
    ingredients: [
      { id: "i21", name: "Ground beef", quantity: 500, unit: "g", optional: false },
      { id: "i22", name: "Spaghetti", quantity: 500, unit: "g", optional: false },
      { id: "i23", name: "Crushed tomatoes", quantity: 800, unit: "g", optional: false },
      { id: "i24", name: "Carrot", quantity: 1, unit: "piece", optional: false },
      { id: "i25", name: "Celery", quantity: 2, unit: "piece", optional: false },
      { id: "i26", name: "Onion", quantity: 1, unit: "piece", optional: false },
      { id: "i27", name: "Whole milk", quantity: 200, unit: "ml", optional: false },
      { id: "i28", name: "Dry white wine", quantity: 150, unit: "ml", optional: true },
    ],
    steps: [
      { stepNumber: 1, instruction: "Finely dice onion, carrot, celery (soffritto). Sauté in olive oil for 10 minutes.", durationMinutes: 10 },
      { stepNumber: 2, instruction: "Add ground beef, breaking up clumps. Cook until browned.", durationMinutes: 8 },
      { stepNumber: 3, instruction: "Add wine and cook until evaporated. Add tomatoes and simmer on very low heat.", durationMinutes: 15 },
      { stepNumber: 4, instruction: "Simmer for 2-3 hours, stirring occasionally. Add milk in the last 30 minutes.", durationMinutes: 150, tip: "Low and slow is the key to authentic Bolognese" },
      { stepNumber: 5, instruction: "Toss with al dente pasta and plenty of Parmigiano.", durationMinutes: 12 },
    ],
    nutrition: { calories: 620, proteinG: 38, carbsG: 68, fatG: 22, fiberG: 5 },
    published: true,
    rating: 4.7,
    ratingCount: 156,
    createdAt: new Date("2024-01-28").toISOString(),
    updatedAt: new Date("2024-01-28").toISOString(),
  },
  {
    id: "5",
    title: "Matcha Tiramisu",
    slug: "matcha-tiramisu",
    description: "A Japanese twist on Italian tiramisu using ceremonial matcha powder and yuzu-soaked ladyfingers.",
    coverImageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800",
    authorId: "user-1",
    category: "Dessert",
    dietaryTags: ["vegetarian"],
    difficulty: "medium",
    servings: 8,
    prepTimeMinutes: 30,
    cookTimeMinutes: 0,
    ingredients: [
      { id: "i29", name: "Mascarpone cheese", quantity: 500, unit: "g", optional: false },
      { id: "i30", name: "Ceremonial matcha", quantity: 3, unit: "tbsp", optional: false },
      { id: "i31", name: "Ladyfingers (savoiardi)", quantity: 24, unit: "piece", optional: false },
      { id: "i32", name: "Egg yolks", quantity: 4, unit: "piece", optional: false },
      { id: "i33", name: "Sugar", quantity: 100, unit: "g", optional: false },
      { id: "i34", name: "Heavy cream", quantity: 300, unit: "ml", optional: false },
      { id: "i35", name: "Yuzu juice", quantity: 2, unit: "tbsp", optional: true },
    ],
    steps: [
      { stepNumber: 1, instruction: "Whisk egg yolks with sugar until pale and ribbon-like.", durationMinutes: 5 },
      { stepNumber: 2, instruction: "Fold in mascarpone until smooth and creamy.", durationMinutes: 3 },
      { stepNumber: 3, instruction: "Whip cream to soft peaks. Fold gently into mascarpone mixture.", durationMinutes: 5 },
      { stepNumber: 4, instruction: "Dissolve 2 tbsp matcha in hot water. Dip ladyfingers briefly and layer in dish.", durationMinutes: 8 },
      { stepNumber: 5, instruction: "Layer cream over ladyfingers. Repeat. Dust with remaining matcha. Chill 4 hours.", durationMinutes: 240, tip: "Overnight is even better" },
    ],
    nutrition: { calories: 490, proteinG: 9, carbsG: 38, fatG: 34, fiberG: 1 },
    published: true,
    rating: 4.6,
    ratingCount: 73,
    createdAt: new Date("2024-04-20").toISOString(),
    updatedAt: new Date("2024-04-20").toISOString(),
  },
  {
    id: "6",
    title: "Keto Avocado Egg Salad",
    slug: "keto-avocado-egg-salad",
    description: "A creamy, protein-rich egg salad with ripe avocado instead of mayo. Ready in 10 minutes.",
    coverImageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800",
    authorId: "user-1",
    category: "Lunch",
    dietaryTags: ["keto", "vegetarian", "gluten-free", "dairy-free"],
    difficulty: "easy",
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 8,
    ingredients: [
      { id: "i36", name: "Eggs", quantity: 6, unit: "piece", optional: false },
      { id: "i37", name: "Ripe avocado", quantity: 1, unit: "piece", optional: false },
      { id: "i38", name: "Dijon mustard", quantity: 1, unit: "tsp", optional: false },
      { id: "i39", name: "Lemon juice", quantity: 1, unit: "tbsp", optional: false },
      { id: "i40", name: "Fresh chives", quantity: 2, unit: "tbsp", optional: true },
      { id: "i41", name: "Salt and pepper", quantity: 1, unit: "to taste", optional: false },
    ],
    steps: [
      { stepNumber: 1, instruction: "Hard boil eggs for 8 minutes. Cool in ice water, then peel and chop.", durationMinutes: 15 },
      { stepNumber: 2, instruction: "Mash avocado with lemon juice, mustard, salt, and pepper.", durationMinutes: 3 },
      { stepNumber: 3, instruction: "Fold in chopped eggs and chives. Serve immediately.", durationMinutes: 2 },
    ],
    nutrition: { calories: 310, proteinG: 20, carbsG: 6, fatG: 24, fiberG: 5 },
    published: true,
    rating: 4.3,
    ratingCount: 45,
    createdAt: new Date("2024-05-01").toISOString(),
    updatedAt: new Date("2024-05-01").toISOString(),
  },
];

export function getRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function addRecipe(recipe: Recipe): Recipe {
  recipes = [recipe, ...recipes];
  return recipe;
}

export function updateRecipe(id: string, updates: Partial<Recipe>): Recipe | undefined {
  const idx = recipes.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  recipes[idx] = { ...recipes[idx], ...updates };
  return recipes[idx];
}

export function deleteRecipe(id: string): boolean {
  const initial = recipes.length;
  recipes = recipes.filter((r) => r.id !== id);
  return recipes.length < initial;
}

export function generateSlug(title: string, existingIds?: string[]): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  
  const existing = recipes.map((r) => r.slug);
  if (!existing.includes(base)) return base;
  
  let counter = 2;
  while (existing.includes(`${base}-${counter}`)) counter++;
  return `${base}-${counter}`;
}
