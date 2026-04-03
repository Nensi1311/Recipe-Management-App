import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "@/components/RecipeCard";
import { HomeClient } from "@/components/HomeClient";

async function getFeaturedRecipes(): Promise<Recipe[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  try {
    const res = await fetch(`${baseUrl}/api/recipes?published=true`, { cache: "no-store" });
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const recipes = await getFeaturedRecipes();
  const featured = recipes.slice(0, 3);
  const recent = recipes.slice(3, 7);

  return (
    <div className="min-h-screen">
      {/* Login error banner */}
      {searchParams.error === "login_required" && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800 px-4 py-3 text-center text-sm text-amber-700 dark:text-amber-400">
          🔒 You need to be logged in to manage recipes.{" "}
          <button
            onClick={undefined}
            className="underline font-medium"
          >
            The /manage section requires a chef_token cookie.
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-orange-500 to-amber-400 dark:from-brand-800 dark:via-orange-900 dark:to-amber-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="text-7xl mb-6 animate-bounce">🍳</div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Your Kitchen,<br />Your Stories
          </h1>
          <p className="text-xl text-orange-100 mb-10 max-w-xl mx-auto">
            Browse thousands of recipes, save your favorites, and share your own culinary creations.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/recipes" className="px-8 py-3.5 bg-white text-brand-600 font-semibold rounded-full hover:bg-orange-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Browse Recipes
            </Link>
            <Link href="/manage/create" className="px-8 py-3.5 bg-white/20 backdrop-blur text-white font-semibold rounded-full border border-white/40 hover:bg-white/30 transition-all duration-200">
              Create Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <HomeClient recipes={recipes} featured={featured} recent={recent} />
    </div>
  );
}
