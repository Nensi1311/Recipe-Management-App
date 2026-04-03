"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store";
import { editRecipe } from "@/store/recipeSlice";
import { Recipe } from "@/types/recipe";
import { RecipeFormEditor } from "@/components/RecipeFormEditor";

export default function EditRecipePage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const selectedRecipe = useSelector((s: RootState) => s.recipes.selectedRecipe);
  const recipes = useSelector((s: RootState) => s.recipes.recipes);

  useEffect(() => {
    const found = selectedRecipe?.id === params.id
      ? selectedRecipe
      : recipes.find((r) => r.id === params.id);
    
    if (found) {
      setRecipe(found);
    } else {
      // Fetch from API
      fetch(`/api/recipes/${params.id}`)
        .then((r) => r.json())
        .then(setRecipe)
        .catch(() => router.push("/manage"));
    }
  }, [params.id, selectedRecipe, recipes, router]);

  const handleSubmit = async (
    values: Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">
  ) => {
    setIsLoading(true);
    const result = await dispatch(editRecipe({ id: params.id, data: values }));
    setIsLoading(false);
    if (editRecipe.fulfilled.match(result)) {
      router.push("/manage");
    }
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⏳</div>
          <p className="text-stone-500">Loading recipe...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">Edit Recipe</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1 font-medium text-brand-500">{recipe.title}</p>
      </div>
      <RecipeFormEditor
        mode="edit"
        initialValues={recipe}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
