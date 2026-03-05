"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";
import { useRecipeScaler } from "@/hooks/useRecipeScaler";
import { NutritionPanel } from "@/components/NutritionPanel";
import { IngredientRow } from "@/components/IngredientRow";
import { StepCard } from "@/components/StepCard";
import {
  Clock,
  Users,
  Flame,
  ChevronLeft,
  Heart,
  Share2,
  Printer,
  Star,
  Plus,
  Minus,
  ChefHat,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { saveRecipe, unsaveRecipe } from "@/store/cookbookSlice";
import { rateRecipe } from "@/store/recipeSlice";

interface RecipeDetailClientProps {
  recipe: Recipe;
}

export const RecipeDetailClient = ({
  recipe: initialRecipe,
}: RecipeDetailClientProps) => {
  const dispatch = useDispatch();
  const { savedIds } = useSelector((state: RootState) => state.cookbook);
  const {
    servingMultiplier,
    setServingMultiplier,
    unitSystem,
    toggleUnitSystem,
  } = useCooking();
  const { scaledIngredients, scaledNutrition } = useRecipeScaler(
    initialRecipe,
    servingMultiplier,
  );
  const [userRating, setUserRating] = useState(0);

  const isSaved = savedIds.includes(initialRecipe.id);

  const handleSaveToggle = () => {
    let newSavedIds: string[];
    if (isSaved) {
      dispatch(unsaveRecipe(initialRecipe.id));
      newSavedIds = savedIds.filter((id) => id !== initialRecipe.id);
    } else {
      dispatch(saveRecipe(initialRecipe.id));
      newSavedIds = [...savedIds, initialRecipe.id];
    }
    localStorage.setItem("savedRecipeIds", JSON.stringify(newSavedIds));
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    dispatch(rateRecipe({ id: initialRecipe.id, rating }) as any);
  };

  const totalTime =
    initialRecipe.prepTimeMinutes + initialRecipe.cookTimeMinutes;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Breadcrumbs & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Link
          href="/recipes"
          className="flex items-center gap-2 text-text-muted hover:text-primary font-bold text-sm uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={16} /> Back to Recipes
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handleSaveToggle}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-sm ${
              isSaved
                ? "bg-secondary text-white"
                : "bg-card border border-border text-text-muted hover:border-secondary"
            }`}
          >
            <Heart size={16} className={isSaved ? "fill-white" : ""} />
            {isSaved ? "Saved to Cookbook" : "Save to Cookbook"}
          </button>
          <button className="p-2.5 rounded-full bg-card border border-border text-text-muted hover:bg-border transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-2.5 rounded-full bg-card border border-border text-text-muted hover:bg-border transition-colors">
            <Printer size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image & Info */}
        <div className="lg:col-span-8">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 group">
            {initialRecipe.coverImageUrl ? (
              <img
                src={initialRecipe.coverImageUrl}
                alt={initialRecipe.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-border flex items-center justify-center">
                <ChefHat size={64} className="text-text-muted opacity-20" />
              </div>
            )}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2">
              {initialRecipe.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-secondary shadow-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-black/80 to-transparent text-white">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-80 mb-2">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {totalTime} min
                </span>
                <span className="flex items-center gap-1">
                  <Flame size={14} /> {initialRecipe.difficulty}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                {initialRecipe.title}
              </h1>
              <p className="text-lg opacity-90 max-w-2xl font-medium leading-relaxed">
                {initialRecipe.description}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {[
              {
                label: "Prep Time",
                value: `${initialRecipe.prepTimeMinutes}m`,
                icon: <Clock className="text-primary" />,
              },
              {
                label: "Cook Time",
                value: `${initialRecipe.cookTimeMinutes}m`,
                icon: <Clock className="text-secondary" />,
              },
              {
                label: "Servings",
                value: initialRecipe.servings,
                icon: <Users className="text-accent" />,
              },
              {
                label: "Rating",
                value: `${initialRecipe.rating || "N/A"}`,
                icon: <Star className="text-yellow-500 fill-yellow-500" />,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card p-4 rounded-2xl border border-border flex items-center gap-4"
              >
                <div className="p-3 bg-background rounded-xl">{stat.icon}</div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                    {stat.label}
                  </div>
                  <div className="font-black text-lg">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Ingredients Section */}
          <section className="mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-3xl font-black tracking-tight text-text">
                Ingredients
              </h2>
              <div className="flex flex-wrap items-center gap-4 bg-card p-2 rounded-2xl border border-border">
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() =>
                      setServingMultiplier(
                        Math.max(0.5, servingMultiplier - 0.5),
                      )
                    }
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-border transition-colors shrink-0"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-black w-14 text-center text-xl">
                    {servingMultiplier}x
                  </span>
                  <button
                    onClick={() =>
                      setServingMultiplier(servingMultiplier + 0.5)
                    }
                    className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-border transition-colors shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="h-8 w-px bg-border" />
                <button
                  onClick={toggleUnitSystem}
                  className="px-4 py-2 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 shrink-0"
                >
                  {unitSystem} Units
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {scaledIngredients.map((ing, idx) => (
                <IngredientRow key={ing.id} ingredient={ing} index={idx} />
              ))}
            </div>
          </section>

          {/* Steps Section */}
          <section>
            <h2 className="text-3xl font-black tracking-tight text-text mb-8">
              Method
            </h2>
            <div className="space-y-4">
              {initialRecipe.steps.map((step, idx) => (
                <StepCard key={idx} step={step} index={idx} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Nutrition & Rating */}
        <div className="lg:col-span-4 space-y-8">
          {scaledNutrition && (
            <NutritionPanel
              nutrition={scaledNutrition}
              servingMultiplier={servingMultiplier}
            />
          )}

          <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-xl font-black tracking-tight mb-6">
              Rate this recipe
            </h3>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    size={32}
                    className={
                      star <= (userRating || initialRecipe.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-border"
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-text-muted font-bold uppercase tracking-widest">
              {initialRecipe.ratingCount} people have rated this
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
