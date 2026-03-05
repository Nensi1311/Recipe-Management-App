import { getRecipes } from "@/lib/db";
import { RecipeCard } from "@/components/RecipeCard";
import Link from "next/link";
import { ChefHat, ArrowRight, Sparkles, Clock, TrendingUp } from "lucide-react";
import LoginErrorBanner from "@/components/LoginErrorBanner";
import { Suspense } from "react";

export default async function Home() {
  const allRecipes = await getRecipes();
  const publishedRecipes = allRecipes.filter((r) => r.published);

  // Sorting and slicing for different sections
  const featuredRecipes = publishedRecipes.slice(0, 3);
  const topRated = [...publishedRecipes]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);
  const recentRecipes = [...publishedRecipes]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      {/* Login required banner */}
      <Suspense fallback={null}>
        <LoginErrorBanner />
      </Suspense>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-500/5 to-pink-500/5 pointer-events-none" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 mb-8 animate-fade-in-down">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">
                Discover delicious recipes
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
              <span className="bg-linear-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Recipe Management
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Browse, save, create, and manage your favorite cooking recipes.
              Scale ingredients, track nutrition, and cook with built-in timers.
            </p>

            <div className="flex flex-wrap gap-5 justify-center">
              <Link href="/recipes">
                <button className="h-12 px-8 rounded-xl bg-linear-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold flex items-center gap-2 shadow-xl shadow-orange-500/20 hover:scale-105 transition-all outline-none">
                  Browse Recipes
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/manage">
                <button className="h-12 px-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105 shadow-sm outline-none">
                  <ChefHat className="w-5 h-5" />
                  Create Recipe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
              Featured Recipes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Handpicked favorites for you
            </p>
          </div>
          <Link href="/recipes">
            <button className="group flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              View All{" "}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {publishedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
            <ChefHat className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">
              No recipes yet. Be the first to create one!
            </p>
          </div>
        )}
      </section>

      {/* Top Rated Section */}
      {topRated.length > 0 && (
        <section className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-xs py-16 border-y border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Top Rated
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {topRated.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recently Added Section */}
      {recentRecipes.length > 0 && (
        <section className="container mx-auto px-4 py-16 mb-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">
              Recently Added
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
