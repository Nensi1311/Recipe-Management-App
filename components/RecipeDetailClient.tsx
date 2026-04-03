"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { rateRecipe, setSelectedRecipe } from "@/store/recipeSlice";
import { useCooking } from "@/context/CookingContext";
import { useRecipeScaler } from "@/hooks/useRecipeScaler";
import { Recipe } from "@/types/recipe";
import { IngredientRow } from "./IngredientRow";
import { StepCard } from "./StepCard";
import { NutritionPanel } from "./NutritionPanel";
import { StarRating } from "./StarRating";
import { useEffect } from "react";

interface Props {
  recipe: Recipe;
}

export function RecipeDetailClient({ recipe }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { servingMultiplier, setServingMultiplier, unitSystem, setUnitSystem } = useCooking();
  const { scaledIngredients, scaledServings, scaledNutrition } = useRecipeScaler(recipe, servingMultiplier);
  const [activeTimerIndex, setActiveTimerIndex] = useState<number | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [currentRating, setCurrentRating] = useState(recipe.rating);
  const [currentRatingCount, setCurrentRatingCount] = useState(recipe.ratingCount);

  useEffect(() => {
    dispatch(setSelectedRecipe(recipe));
    return () => { dispatch(setSelectedRecipe(null)); };
  }, [dispatch, recipe]);

  const handleRate = async (rating: number) => {
    setUserRating(rating);
    const result = await dispatch(rateRecipe({ id: recipe.id, rating }));
    if (rateRecipe.fulfilled.match(result)) {
      setCurrentRating(result.payload.rating);
      setCurrentRatingCount(result.payload.ratingCount);
      setRatingSubmitted(true);
    }
  };

  const difficultyColors = {
    easy: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
  };

  return (
    <article className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96 overflow-hidden">
        {recipe.coverImageUrl ? (
          <img src={recipe.coverImageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-400 to-amber-500 flex items-center justify-center text-9xl">🍽️</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 backdrop-blur text-white">{recipe.category}</span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColors[recipe.difficulty]}`}>{recipe.difficulty}</span>
            {recipe.dietaryTags.map((tag) => (
              <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-sage-500/80 text-white">{tag}</span>
            ))}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight">{recipe.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description & Meta */}
            <div>
              <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">{recipe.description}</p>
              <div className="flex flex-wrap gap-6 mt-6 text-sm text-stone-600 dark:text-stone-400">
                <div className="flex flex-col items-center gap-1 bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800">
                  <span className="text-2xl">⏱️</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{recipe.prepTimeMinutes}m</span>
                  <span className="text-xs">Prep</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800">
                  <span className="text-2xl">🔥</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{recipe.cookTimeMinutes}m</span>
                  <span className="text-xs">Cook</span>
                </div>
                <div className="flex flex-col items-center gap-1 bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800">
                  <span className="text-2xl">👤</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">{scaledServings}</span>
                  <span className="text-xs">Servings</span>
                </div>
              </div>
            </div>

            {/* Serving scaler + unit toggle */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800">
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">Servings</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
                      className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-brand-100 dark:hover:bg-brand-900/30 font-bold text-lg transition-colors"
                    >−</button>
                    <span className="font-display text-xl font-bold text-brand-500 w-16 text-center">×{servingMultiplier}</span>
                    <button
                      onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
                      className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-brand-100 dark:hover:bg-brand-900/30 font-bold text-lg transition-colors"
                    >+</button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-2">Units</p>
                  <div className="flex rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700">
                    <button
                      onClick={() => setUnitSystem("metric")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${unitSystem === "metric" ? "bg-brand-500 text-white" : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400"}`}
                    >Metric</button>
                    <button
                      onClick={() => setUnitSystem("imperial")}
                      className={`px-4 py-2 text-sm font-medium transition-colors ${unitSystem === "imperial" ? "bg-brand-500 text-white" : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400"}`}
                    >Imperial</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Ingredients</h2>
              <div>
                {scaledIngredients.map((ing, i) => (
                  <IngredientRow key={ing.id} ingredient={ing} index={i} scaled={true} />
                ))}
              </div>
            </div>

            {/* Steps */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">Instructions</h2>
              <div>
                {recipe.steps.map((step, i) => (
                  <StepCard
                    key={step.stepNumber}
                    step={step}
                    index={i}
                    isFirst={i === 0}
                    isLast={i === recipe.steps.length - 1}
                    activeTimerIndex={activeTimerIndex}
                    onTimerStart={setActiveTimerIndex}
                  />
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800">
              <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">Rate This Recipe</h2>
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={currentRating} ratingCount={currentRatingCount} size="lg" />
              </div>
              {ratingSubmitted ? (
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">✅ Thanks for your rating!</p>
              ) : (
                <div>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-3">How would you rate this recipe?</p>
                  <StarRating
                    rating={userRating}
                    interactive
                    onRate={handleRate}
                    size="lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {scaledNutrition && (
              <NutritionPanel nutrition={scaledNutrition} servingMultiplier={1} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
