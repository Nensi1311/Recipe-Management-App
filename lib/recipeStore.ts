import {
  Recipe,
  Difficulty,
  DietaryTag,
  MeasurementUnit,
} from "@/types/recipe";

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

const seedRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    slug: "classic-margherita-pizza",
    description:
      "A traditional Italian pizza with fresh mozzarella, San Marzano tomatoes, and fragrant basil leaves on a perfectly crispy thin crust.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=800&q=80",
    authorId: "chef-1",
    category: "Italian",
    dietaryTags: [DietaryTag.Vegetarian],
    difficulty: Difficulty.Medium,
    servings: 4,
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    ingredients: [
      {
        id: "i1",
        name: "Pizza dough",
        quantity: 500,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i2",
        name: "San Marzano tomatoes",
        quantity: 400,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i3",
        name: "Fresh mozzarella",
        quantity: 250,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i4",
        name: "Fresh basil leaves",
        quantity: 10,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i5",
        name: "Extra virgin olive oil",
        quantity: 2,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i6",
        name: "Salt",
        quantity: 1,
        unit: MeasurementUnit.Teaspoon,
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction:
          "Preheat oven to 475°F (245°C) with a pizza stone inside for at least 30 minutes.",
        durationMinutes: 30,
        tip: "A hot stone is key to a crispy crust.",
      },
      {
        stepNumber: 2,
        instruction:
          "Crush the San Marzano tomatoes by hand and season with salt.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 3,
        instruction:
          "Stretch the dough into a 12-inch circle on a floured surface.",
        durationMinutes: 5,
        tip: "Let the dough come to room temperature first.",
      },
      {
        stepNumber: 4,
        instruction:
          "Spread tomato sauce evenly, leaving a 1-inch border. Add torn mozzarella pieces.",
        durationMinutes: 3,
        tip: "",
      },
      {
        stepNumber: 5,
        instruction:
          "Slide pizza onto hot stone and bake for 10-12 minutes until crust is golden.",
        durationMinutes: 12,
        tip: "",
      },
      {
        stepNumber: 6,
        instruction:
          "Remove from oven, top with fresh basil and a drizzle of olive oil.",
        durationMinutes: 1,
        tip: "Add basil after baking to keep it fresh and vibrant.",
      },
    ],
    nutrition: { calories: 820, proteinG: 34, carbsG: 95, fatG: 32, fiberG: 4 },
    published: true,
    rating: 4.5,
    ratingCount: 128,
    createdAt: "2025-12-01T10:00:00Z",
    updatedAt: "2025-12-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Thai Green Curry",
    slug: "thai-green-curry",
    description:
      "An aromatic Thai green curry loaded with vegetables and tofu in a creamy coconut milk base, served over jasmine rice.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    authorId: "chef-1",
    category: "Thai",
    dietaryTags: [
      DietaryTag.Vegan,
      DietaryTag.GlutenFree,
      DietaryTag.DairyFree,
    ],
    difficulty: Difficulty.Easy,
    servings: 4,
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    ingredients: [
      {
        id: "i7",
        name: "Green curry paste",
        quantity: 3,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i8",
        name: "Coconut milk",
        quantity: 400,
        unit: MeasurementUnit.Milliliter,
        optional: false,
      },
      {
        id: "i9",
        name: "Firm tofu",
        quantity: 300,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i10",
        name: "Thai eggplant",
        quantity: 200,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i11",
        name: "Bamboo shoots",
        quantity: 100,
        unit: MeasurementUnit.Gram,
        optional: true,
      },
      {
        id: "i12",
        name: "Thai basil",
        quantity: 1,
        unit: MeasurementUnit.Cup,
        optional: false,
      },
      {
        id: "i13",
        name: "Jasmine rice",
        quantity: 2,
        unit: MeasurementUnit.Cup,
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction:
          "Heat a wok over medium heat. Add 2 tbsp of thick coconut cream and stir until it splits.",
        durationMinutes: 3,
        tip: "Splitting the coconut cream brings out the curry paste flavor.",
      },
      {
        stepNumber: 2,
        instruction:
          "Add green curry paste and fry for 2 minutes until fragrant.",
        durationMinutes: 2,
        tip: "",
      },
      {
        stepNumber: 3,
        instruction:
          "Pour in remaining coconut milk, bring to a gentle simmer.",
        durationMinutes: 3,
        tip: "",
      },
      {
        stepNumber: 4,
        instruction:
          "Add cubed tofu, eggplant, and bamboo shoots. Cook for 15 minutes.",
        durationMinutes: 15,
        tip: "Press tofu before cooking for better texture.",
      },
      {
        stepNumber: 5,
        instruction:
          "Stir in Thai basil leaves and remove from heat. Serve over jasmine rice.",
        durationMinutes: 2,
        tip: "",
      },
    ],
    nutrition: { calories: 520, proteinG: 22, carbsG: 48, fatG: 28, fiberG: 6 },
    published: true,
    rating: 4.7,
    ratingCount: 95,
    createdAt: "2025-12-05T08:00:00Z",
    updatedAt: "2025-12-20T09:15:00Z",
  },
  {
    id: "3",
    title: "Lemon Herb Grilled Salmon",
    slug: "lemon-herb-grilled-salmon",
    description:
      "Perfectly grilled salmon fillets marinated in a bright lemon-herb mixture, served with roasted asparagus.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    authorId: "chef-2",
    category: "Seafood",
    dietaryTags: [DietaryTag.GlutenFree, DietaryTag.DairyFree, DietaryTag.Keto],
    difficulty: Difficulty.Easy,
    servings: 2,
    prepTimeMinutes: 10,
    cookTimeMinutes: 12,
    ingredients: [
      {
        id: "i14",
        name: "Salmon fillets",
        quantity: 2,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i15",
        name: "Lemon",
        quantity: 1,
        unit: MeasurementUnit.Whole,
        optional: false,
      },
      {
        id: "i16",
        name: "Fresh dill",
        quantity: 2,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i17",
        name: "Garlic cloves",
        quantity: 3,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i18",
        name: "Olive oil",
        quantity: 3,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i19",
        name: "Asparagus",
        quantity: 200,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction:
          "Combine lemon zest, lemon juice, minced garlic, chopped dill, and olive oil.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 2,
        instruction:
          "Marinate salmon in the lemon-herb mixture for at least 15 minutes.",
        durationMinutes: 15,
        tip: 'Don\'t marinate too long — acid from lemon can "cook" the fish.',
      },
      {
        stepNumber: 3,
        instruction: "Preheat grill to medium-high heat. Oil the grates.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 4,
        instruction:
          "Grill salmon skin-side down for 5-6 minutes, then flip and cook for another 3-4 minutes.",
        durationMinutes: 10,
        tip: "Fish is done when it flakes easily with a fork.",
      },
      {
        stepNumber: 5,
        instruction:
          "Toss asparagus in olive oil, salt, and pepper. Grill alongside the salmon.",
        durationMinutes: 5,
        tip: "",
      },
    ],
    nutrition: { calories: 380, proteinG: 42, carbsG: 8, fatG: 20, fiberG: 3 },
    published: true,
    rating: 4.8,
    ratingCount: 67,
    createdAt: "2025-12-10T12:00:00Z",
    updatedAt: "2025-12-22T16:45:00Z",
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    slug: "chocolate-lava-cake",
    description:
      "Decadent individual chocolate cakes with a warm, gooey molten center. The ultimate dessert for chocolate lovers.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
    authorId: "chef-1",
    category: "Dessert",
    dietaryTags: [DietaryTag.Vegetarian],
    difficulty: Difficulty.Hard,
    servings: 4,
    prepTimeMinutes: 20,
    cookTimeMinutes: 14,
    ingredients: [
      {
        id: "i20",
        name: "Dark chocolate (70%)",
        quantity: 200,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i21",
        name: "Unsalted butter",
        quantity: 120,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i22",
        name: "Eggs",
        quantity: 4,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i23",
        name: "Sugar",
        quantity: 80,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i24",
        name: "All-purpose flour",
        quantity: 40,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i25",
        name: "Vanilla extract",
        quantity: 1,
        unit: MeasurementUnit.Teaspoon,
        optional: false,
      },
      {
        id: "i26",
        name: "Cocoa powder for dusting",
        quantity: 1,
        unit: MeasurementUnit.Tablespoon,
        optional: true,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction:
          "Preheat oven to 425°F (220°C). Butter and cocoa-dust four ramekins.",
        durationMinutes: 5,
        tip: "Chilling the ramekins after buttering helps the cakes release cleanly.",
      },
      {
        stepNumber: 2,
        instruction:
          "Melt chocolate and butter together in a double boiler, stirring until smooth.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 3,
        instruction:
          "Whisk eggs and sugar until thick and pale. Fold in the chocolate mixture.",
        durationMinutes: 5,
        tip: "Be gentle to keep the air in the batter.",
      },
      {
        stepNumber: 4,
        instruction:
          "Sift in flour and fold until just combined. Add vanilla extract.",
        durationMinutes: 2,
        tip: "",
      },
      {
        stepNumber: 5,
        instruction:
          "Divide batter among ramekins. Bake for exactly 12-14 minutes.",
        durationMinutes: 14,
        tip: "The edges should be firm but the center should jiggle slightly.",
      },
      {
        stepNumber: 6,
        instruction:
          "Let cool for 1 minute, then invert onto plates. Serve immediately.",
        durationMinutes: 1,
        tip: "",
      },
    ],
    nutrition: { calories: 580, proteinG: 10, carbsG: 52, fatG: 38, fiberG: 4 },
    published: true,
    rating: 4.9,
    ratingCount: 203,
    createdAt: "2025-11-20T15:00:00Z",
    updatedAt: "2025-12-18T11:20:00Z",
  },
  {
    id: "5",
    title: "Mediterranean Quinoa Bowl",
    slug: "mediterranean-quinoa-bowl",
    description:
      "A vibrant and nutritious grain bowl with roasted vegetables, chickpeas, and a tangy tahini dressing.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    authorId: "chef-2",
    category: "Mediterranean",
    dietaryTags: [
      DietaryTag.Vegan,
      DietaryTag.GlutenFree,
      DietaryTag.DairyFree,
    ],
    difficulty: Difficulty.Easy,
    servings: 2,
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    ingredients: [
      {
        id: "i27",
        name: "Quinoa",
        quantity: 1,
        unit: MeasurementUnit.Cup,
        optional: false,
      },
      {
        id: "i28",
        name: "Chickpeas",
        quantity: 400,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i29",
        name: "Cherry tomatoes",
        quantity: 200,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i30",
        name: "Cucumber",
        quantity: 1,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i31",
        name: "Red onion",
        quantity: 0.5,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i32",
        name: "Kalamata olives",
        quantity: 50,
        unit: MeasurementUnit.Gram,
        optional: true,
      },
      {
        id: "i33",
        name: "Tahini",
        quantity: 3,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i34",
        name: "Lemon juice",
        quantity: 2,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction:
          "Cook quinoa according to package instructions. Let cool slightly.",
        durationMinutes: 15,
        tip: "Rinse quinoa before cooking to remove bitterness.",
      },
      {
        stepNumber: 2,
        instruction:
          "Season chickpeas with cumin, paprika, salt, and olive oil. Roast at 400°F for 20 minutes.",
        durationMinutes: 20,
        tip: "Pat chickpeas dry for maximum crispiness.",
      },
      {
        stepNumber: 3,
        instruction:
          "Dice cucumber, halve cherry tomatoes, and thinly slice red onion.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 4,
        instruction:
          "Whisk together tahini, lemon juice, a splash of water, salt, and pepper.",
        durationMinutes: 3,
        tip: "",
      },
      {
        stepNumber: 5,
        instruction:
          "Assemble bowls: quinoa base, topped with vegetables, roasted chickpeas, and olives. Drizzle tahini dressing.",
        durationMinutes: 3,
        tip: "",
      },
    ],
    nutrition: {
      calories: 480,
      proteinG: 18,
      carbsG: 62,
      fatG: 18,
      fiberG: 12,
    },
    published: true,
    rating: 4.3,
    ratingCount: 54,
    createdAt: "2025-12-15T09:00:00Z",
    updatedAt: "2025-12-25T10:00:00Z",
  },
  {
    id: "6",
    title: "Spicy Korean Bibimbap",
    slug: "spicy-korean-bibimbap",
    description:
      "A colorful Korean rice bowl topped with sautéed vegetables, spicy gochujang sauce, and a perfectly fried egg.",
    coverImageUrl:
      "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=800&q=80",
    authorId: "chef-1",
    category: "Korean",
    dietaryTags: [DietaryTag.DairyFree],
    difficulty: Difficulty.Medium,
    servings: 2,
    prepTimeMinutes: 20,
    cookTimeMinutes: 20,
    ingredients: [
      {
        id: "i35",
        name: "Short-grain rice",
        quantity: 2,
        unit: MeasurementUnit.Cup,
        optional: false,
      },
      {
        id: "i36",
        name: "Spinach",
        quantity: 200,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i37",
        name: "Bean sprouts",
        quantity: 150,
        unit: MeasurementUnit.Gram,
        optional: false,
      },
      {
        id: "i38",
        name: "Carrots",
        quantity: 2,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i39",
        name: "Zucchini",
        quantity: 1,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
      {
        id: "i40",
        name: "Gochujang paste",
        quantity: 3,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i41",
        name: "Sesame oil",
        quantity: 2,
        unit: MeasurementUnit.Tablespoon,
        optional: false,
      },
      {
        id: "i42",
        name: "Eggs",
        quantity: 2,
        unit: MeasurementUnit.Piece,
        optional: false,
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: "Cook rice and keep warm.",
        durationMinutes: 20,
        tip: "",
      },
      {
        stepNumber: 2,
        instruction:
          "Blanch spinach, season with sesame oil and salt. Blanch bean sprouts similarly.",
        durationMinutes: 5,
        tip: "",
      },
      {
        stepNumber: 3,
        instruction:
          "Julienne carrots and zucchini. Sauté each separately with a pinch of salt.",
        durationMinutes: 10,
        tip: "Cook each vegetable separately to control doneness.",
      },
      {
        stepNumber: 4,
        instruction: "Fry eggs sunny-side up in sesame oil.",
        durationMinutes: 3,
        tip: "",
      },
      {
        stepNumber: 5,
        instruction:
          "Arrange rice in bowls, top with vegetables in sections, add egg, and serve with gochujang.",
        durationMinutes: 2,
        tip: "Mix everything together before eating for the best experience.",
      },
    ],
    nutrition: { calories: 620, proteinG: 22, carbsG: 88, fatG: 18, fiberG: 7 },
    published: true,
    rating: 4.6,
    ratingCount: 82,
    createdAt: "2025-11-25T11:00:00Z",
    updatedAt: "2025-12-20T13:30:00Z",
  },
];

// ── In-Memory Store ───────────────────────────────────────

const globalForRecipes = globalThis as unknown as {
  __RECIPES_STORE__: Recipe[] | undefined;
};

if (!globalForRecipes.__RECIPES_STORE__) {
  globalForRecipes.__RECIPES_STORE__ = [...seedRecipes];
}

let recipes: Recipe[] = globalForRecipes.__RECIPES_STORE__;

export function getAllRecipes(): Recipe[] {
  return [...recipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function addRecipe(
  data: Omit<
    Recipe,
    "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt"
  >,
): Recipe {
  const now = new Date().toISOString();
  const recipe: Recipe = {
    ...data,
    id: generateId(),
    slug: slugify(data.title),
    rating: 0,
    ratingCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  recipes.push(recipe);
  return recipe;
}

export function updateRecipe(
  id: string,
  data: Partial<Omit<Recipe, "id" | "createdAt">>,
): Recipe | undefined {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return undefined;

  const existing = recipes[index];
  const updated: Recipe = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
    slug: data.title ? slugify(data.title) : existing.slug,
  };
  recipes[index] = updated;
  return updated;
}

export function deleteRecipe(id: string): boolean {
  const index = recipes.findIndex((r) => r.id === id);
  if (index === -1) return false;
  recipes.splice(index, 1);
  return true;
}

export function rateRecipe(
  id: string,
  newRating: number,
): { rating: number; ratingCount: number } | undefined {
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) return undefined;

  const totalRating = recipe.rating * recipe.ratingCount + newRating;
  recipe.ratingCount += 1;
  recipe.rating = Math.round((totalRating / recipe.ratingCount) * 10) / 10;

  return { rating: recipe.rating, ratingCount: recipe.ratingCount };
}

export { slugify, generateId };
