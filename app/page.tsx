import { getRecipes } from "@/lib/db";
import { RecipeCard } from "@/components/RecipeCard";
import Link from "next/link";
import { ChefHat, ArrowRight, Sparkles, TrendingUp, Clock } from "lucide-react";

export default async function Home() {
  const allRecipes = await getRecipes();
  const publishedRecipes = allRecipes.filter((r) => r.published);

  const featuredRecipes = publishedRecipes.slice(0, 3);
  const recentRecipes = [...publishedRecipes]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="animate-fade-in pb-24">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden px-8 py-24 md:py-32 mb-16 text-center"
        style={{
          background:
            "linear-gradient(135deg, #fde8d8 0%, #fce4ec 40%, #f3e5f5 70%, #ede7f6 100%)",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[#f06449] font-semibold text-sm mb-8"
            style={{ background: "rgba(255,236,210,0.85)" }}
          >
            <Sparkles size={14} />
            <span>Discover delicious recipes</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            <span className="hero-gradient-text">Recipe Management</span>
          </h1>

          <p className="text-base md:text-lg text-zinc-600 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Browse, save, create, and manage your favorite cooking recipes.
            Scale ingredients, track nutrition, and cook with built-in timers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recipes"
              className="flex items-center justify-center gap-4 px-10 py-20 text-white font-bold square-full text-base shadow-lg transition-all hover:shadow-xl hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f06449 0%, #e14e86 100%)",
              }}
            >
              Browse Recipes <ArrowRight size={18} />
            </Link>
            <Link
              href="/manage"
              className="flex items-center justify-center gap-3 px-8 py-10 bg-white border border-zinc-200 text-zinc-800 font-bold square-full shadow-sm hover:bg-zinc-50 transition-all text-base"
            >
              <ChefHat size={18} className="text-zinc-500" />
              Create Recipe
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="mb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[#0f172a]">
              Featured Recipes
            </h2>
            <p className="text-text-muted font-medium text-lg">
              Handpicked favorites for you
            </p>
          </div>
          <Link
            href="/recipes"
            className="flex items-center gap-2 font-bold text-sm text-text hover:text-primary transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-10">
          <TrendingUp size={28} className="text-[#f06449]" />
          <h2 className="text-4xl font-extrabold text-[#0f172a]">Top Rated</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedRecipes.slice(0, 3).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section>
        <div className="flex items-center gap-3 mb-10">
          <Clock size={28} className="text-[#3b82f6]" />
          <h2 className="text-4xl font-extrabold text-[#0f172a]">
            Recently Added
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} variant="public" />
          ))}
        </div>
      </section>
    </div>
  );
}
