"use client";

import { ManageRecipeForm } from "@/components/ManageRecipeForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createRecipe } from "@/store/recipeSlice";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CreateRecipePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleCreate = async (recipeData: Recipe) => {
    try {
      await dispatch(createRecipe(recipeData as any)).unwrap();
      router.push("/manage");
    } catch (error) {
      alert("Failed to create recipe. Please check your data.");
    }
  };

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

      <ManageRecipeForm title="Create New Recipe" onSubmit={handleCreate} />
    </div>
  );
}
