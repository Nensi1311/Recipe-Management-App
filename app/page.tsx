import Link from "next/link";
import { ChefHat, BookOpen, Star, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gray-800 border-gray-700 mb-6">
              <ChefHat size={18} className="text-purple-400" />
              <span className="text-sm text-gray-300 font-medium">
                Your Personal Recipe Manager
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-white">
              Recipe Management
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Browse, save, create and manage your favorite cooking recipes.
              Scale ingredients, track nutrition and cook with built-in timers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/recipes"
                className="px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700"
              >
                Browse Recipes
              </Link>
              <Link
                href="/manage/create"
                className="px-6 py-3 rounded border border-gray-600 text-gray-300 font-semibold hover:bg-gray-800"
              >
                Create Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Discover Recipes",
              desc: "Browse our curated collection with simple filters for diet, difficulty, and cuisine.",
            },
            {
              icon: Star,
              title: "Rate & Save",
              desc: "Rate recipes and save your favorites to your personal cookbook for easy access.",
            },
            {
              icon: Clock,
              title: "Cook Smarter",
              desc: "Built-in timers, serving scalers, and unit conversion to make cooking effortless.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded bg-gray-800 border border-gray-700 hover:border-gray-600"
            >
              <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
