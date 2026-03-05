"use client";

import { useEffect, useState } from "react";
import { ManageRecipeForm } from "@/components/ManageRecipeForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { editRecipe, fetchRecipes } from "@/store/recipeSlice";
import { useRouter, useParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditRecipePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { recipes, status } = useSelector((state: RootState) => state.recipes);
  const recipeToEdit = recipes.find((r) => r.id === id);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  const handleUpdate = async (recipeData: Recipe) => {
    try {
      await dispatch(editRecipe({ id, recipe: recipeData })).unwrap();
      router.push("/manage");
    } catch (error) {
      alert("Failed to update recipe.");
    }
  };

  if (status === "loading" && !recipeToEdit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="font-black uppercase tracking-widest text-text-muted text-xs">
          Loading Recipe Data...
        </p>
      </div>
    );
  }

  if (!recipeToEdit) {
    return (
      <div className="text-center py-24">
        <h2 className="text-3xl font-black mb-4">Recipe Not Found</h2>
        <Link href="/manage" className="text-primary font-bold hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="fade-in pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-8 mb-6">
        <Link
          href="/manage"
          className="flex items-center gap-2 text-text-muted hover:text-primary font-bold text-sm uppercase tracking-widest transition-colors mb-6"
        >
          <ChevronLeft size={16} /> Dashboard
        </Link>
      </div>

      <ManageRecipeForm
        title="Edit Masterpiece"
        initialValues={recipeToEdit}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
