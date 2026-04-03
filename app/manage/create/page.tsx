"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/store";
import { createRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import { RecipeFormEditor } from "@/components/RecipeFormEditor";

export default function CreateRecipePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">
  ) => {
    setIsLoading(true);
    const result = await dispatch(createRecipe(values));
    setIsLoading(false);
    if (createRecipe.fulfilled.match(result)) {
      router.push("/manage");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">Create Recipe</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Share your culinary creation with the world</p>
      </div>
      <RecipeFormEditor mode="create" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
