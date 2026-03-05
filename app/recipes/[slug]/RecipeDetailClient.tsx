"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { rateRecipe } from "@/store/recipeSlice";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { useCooking } from "@/context/CookingContext";
import { useRecipeScaler } from "@/hooks/useRecipeScaler";
import { Recipe } from "@/types/recipe";
import IngredientRow from "@/components/IngredientRow";
import StepCard from "@/components/StepCard";
import NutritionPanel from "@/components/NutritionPanel";
import {
  Clock,
  Users,
  Star,
  Heart,
  Minus,
  Plus,
  ChevronLeft,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface RecipeDetailClientProps {
  slug: string;
  initialRecipe?: Recipe;
}

export default function RecipeDetailClient({
  slug,
  initialRecipe,
}: RecipeDetailClientProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);

  // Find recipe in Redux if not provided via initialRecipe
  const recipe = initialRecipe || recipes.find((r) => r.slug === slug);

  const savedIds = useSelector((state: RootState) => state.cookbook.savedIds);
  const isSaved = recipe ? savedIds.includes(recipe.id) : false;

  const { servingMultiplier, setServingMultiplier, unitSystem, setUnitSystem } =
    useCooking();

  const { scaledIngredients, scaledServings, scaledNutrition } =
    useRecipeScaler(recipe || ({} as Recipe), servingMultiplier);

  const [activeTimerStep, setActiveTimerStep] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState(recipe?.rating || 0);
  const [currentRatingCount, setCurrentRatingCount] = useState(
    recipe?.ratingCount || 0,
  );

  // Update local state when recipe changes (e.g. after Redux hydration)
  useEffect(() => {
    if (recipe) {
      setCurrentRating(recipe.rating);
      setCurrentRatingCount(recipe.ratingCount);
    }
  }, [recipe]);

  const activeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  if (!recipe) {
    // If we're still loading, show a simple spinner/message
    if (status === "loading" || status === "idle") {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading recipe...</p>
        </div>
      );
    }

    // Truly not found
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl font-extrabold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Recipe not found</p>
        <Link
          href="/recipes"
          className="px-6 py-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  const handleStartTimer = useCallback(
    (stepNumber: number, _minutes: number) => {
      // Stop previous timer
      if (activeTimerRef.current) {
        clearInterval(activeTimerRef.current);
      }
      setActiveTimerStep(stepNumber);
    },
    [],
  );

  const handleRate = useCallback(
    async (rating: number) => {
      setUserRating(rating);
      try {
        const result = await dispatch(
          rateRecipe({ id: recipe.id, rating }),
        ).unwrap();
        setCurrentRating(result.rating);
        setCurrentRatingCount(result.ratingCount);
      } catch {
        // handle error
      }
    },
    [dispatch, recipe.id],
  );

  const handleSaveToggle = useCallback(() => {
    if (isSaved) {
      dispatch(unsaveRecipe(recipe.id));
    } else {
      dispatch(saveRecipe(recipe.id));
    }
  }, [dispatch, isSaved, recipe.id]);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/recipes"
        className="inline-flex items-center gap-1 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ChevronLeft size={18} />
        Back to Recipes
      </Link>

      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 rounded overflow-hidden mb-8 bg-gray-900 flex items-center justify-center">
        {recipe.coverImageUrl ? (
          <img
            src={recipe.coverImageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
            <span className="text-8xl md:text-[10rem] font-bold opacity-20">
              {recipe.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gray-900/60" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded bg-purple-600 text-white text-xs font-medium">
              {recipe.category}
            </span>
            <span
              className={clsx(
                "px-2 py-1 rounded text-xs font-medium",
                recipe.difficulty === "easy" && "bg-emerald-600 text-white",
                recipe.difficulty === "medium" && "bg-amber-600 text-white",
                recipe.difficulty === "hard" && "bg-rose-600 text-white",
              )}
            >
              {recipe.difficulty}
            </span>
            {recipe.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2">
            {recipe.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {recipe.description}
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveToggle}
          className={clsx(
            "absolute top-4 right-4 p-3 rounded",
            isSaved
              ? "bg-rose-600 text-white"
              : "bg-gray-800 text-gray-300 hover:text-white",
          )}
        >
          <Heart size={22} className={clsx(isSaved && "fill-current")} />
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: Clock,
            label: "Prep",
            value: `${recipe.prepTimeMinutes} min`,
          },
          {
            icon: Clock,
            label: "Cook",
            value: `${recipe.cookTimeMinutes} min`,
          },
          { icon: Clock, label: "Total", value: `${totalTime} min` },
          { icon: Users, label: "Servings", value: String(scaledServings) },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-4 rounded bg-gray-800 border border-gray-700"
          >
            <stat.icon size={20} className="text-purple-400" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-4 rounded bg-gray-800 border border-gray-700">
        {/* Serving Size Adjuster */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-medium">Servings:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setServingMultiplier(servingMultiplier - 0.5)}
              disabled={servingMultiplier <= 0.5}
              className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-30"
            >
              <Minus size={16} />
            </button>
            <span className="w-16 text-center text-lg font-bold text-white">
              {scaledServings}
            </span>
            <button
              onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
              className="p-1.5 rounded bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-2 sm:ml-auto">
          <span className="text-sm text-gray-400 font-medium">Units:</span>
          <div className="flex rounded overflow-hidden border border-gray-700">
            <button
              onClick={() => setUnitSystem("metric")}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium transition-colors",
                unitSystem === "metric"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white",
              )}
            >
              Metric
            </button>
            <button
              onClick={() => setUnitSystem("imperial")}
              className={clsx(
                "px-4 py-1.5 text-sm font-medium transition-colors",
                unitSystem === "imperial"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-700 text-gray-400 hover:text-white",
              )}
            >
              Imperial
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ingredients */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Ingredients</h2>
            <div className="space-y-1">
              {scaledIngredients.map((ingredient) => (
                <IngredientRow
                  key={ingredient.id}
                  ingredient={ingredient}
                  mode="read"
                />
              ))}
            </div>
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Instructions</h2>
            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <StepCard
                  key={step.stepNumber}
                  step={step}
                  mode="read"
                  activeTimerStep={activeTimerStep}
                  onStartTimer={handleStartTimer}
                />
              ))}
            </div>
          </section>

          {/* Rating Section */}
          <section className="p-6 rounded bg-gray-800 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-2">
              Rate this Recipe
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-white">
                {currentRating}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={clsx(
                      i < Math.round(currentRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-600",
                    )}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm">
                ({currentRatingCount} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Your rating:</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handleRate(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star
                      size={28}
                      className={clsx(
                        "transition-colors",
                        i < (hoverRating || userRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-600 hover:text-gray-500",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <NutritionPanel nutrition={scaledNutrition} />
        </div>
      </div>
    </div>
  );
}
