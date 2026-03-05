"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { AppDispatch, RootState } from "@/store";
import { editRecipe, setSelectedRecipe } from "@/store/recipeSlice";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import { Recipe, DietaryTag, Difficulty } from "@/types/recipe";
import IngredientRow from "@/components/IngredientRow";
import StepCard from "@/components/StepCard";
import { Save, Eye, Edit3 } from "lucide-react";
import { Plus } from "lucide-react";
import clsx from "clsx";

export default function EditRecipePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const selectedRecipe = useSelector(
    (state: RootState) => state.recipes.selectedRecipe,
  );
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try Redux first, then fetch
    const existing =
      selectedRecipe?.id === params.id
        ? selectedRecipe
        : recipes.find((r) => r.id === params.id);

    if (existing) {
      setRecipe(existing);
      setIsLoading(false);
    } else {
      // Fetch from API
      fetch(`/api/recipes/${params.id}`)
        .then((res) => res.json())
        .then((data: Recipe) => {
          setRecipe(data);
          dispatch(setSelectedRecipe(data));
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [params.id, selectedRecipe, recipes, dispatch]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-9 w-48 skeleton rounded-lg" />
        <div className="h-64 skeleton rounded-2xl" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-400">Recipe not found</h2>
      </div>
    );
  }

  return <EditRecipeForm recipe={recipe} />;
}

function EditRecipeForm({ recipe }: { recipe: Recipe }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addStep,
    updateStep,
    removeStep,
    moveStep,
  } = useRecipeForm(recipe);

  const onSave = async (formValues: typeof values, publish?: boolean) => {
    try {
      await dispatch(
        editRecipe({
          id: recipe.id,
          data: {
            ...formValues,
            published: publish ?? formValues.published,
          },
        }),
      ).unwrap();
      router.push("/manage");
    } catch (err) {
      console.error("Failed to update recipe:", err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Edit3 size={28} className="text-purple-400" />
        <h1 className="text-3xl font-extrabold text-white">Edit Recipe</h1>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <section className="p-6 rounded bg-gray-800 border border-gray-700 space-y-4">
          <h2 className="text-lg font-bold text-white">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={values.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={clsx(
                  "w-full px-4 py-2.5 rounded bg-gray-800 border text-white focus:outline-none",
                  errors.title
                    ? "border-rose-500"
                    : "border-gray-700 focus:border-purple-500",
                )}
              />
              {errors.title && (
                <p className="text-rose-400 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Category
              </label>
              <input
                type="text"
                value={values.category}
                onChange={(e) => handleChange("category", e.target.value)}
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Difficulty
              </label>
              <select
                value={values.difficulty}
                onChange={(e) =>
                  handleChange("difficulty", e.target.value as Difficulty)
                }
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              >
                {Object.values(Difficulty).map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Servings *
              </label>
              <input
                type="number"
                min={1}
                value={values.servings}
                onChange={(e) =>
                  handleChange("servings", parseInt(e.target.value) || 1)
                }
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Prep Time (min)
              </label>
              <input
                type="number"
                min={0}
                value={values.prepTimeMinutes}
                onChange={(e) =>
                  handleChange("prepTimeMinutes", parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cook Time (min)
              </label>
              <input
                type="number"
                min={0}
                value={values.cookTimeMinutes}
                onChange={(e) =>
                  handleChange("cookTimeMinutes", parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                value={values.coverImageUrl}
                onChange={(e) => handleChange("coverImageUrl", e.target.value)}
                className="w-full px-4 py-2.5 rounded bg-gray-800 border border-gray-600 text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Dietary Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Dietary Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.values(DietaryTag).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const tags = values.dietaryTags.includes(tag)
                      ? values.dietaryTags.filter((t) => t !== tag)
                      : [...values.dietaryTags, tag];
                    handleChange("dietaryTags", tags);
                  }}
                  className={clsx(
                    "px-3 py-1 rounded text-xs font-medium",
                    values.dietaryTags.includes(tag)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className="p-6 rounded bg-gray-800 border border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Ingredients *</h2>
            <button
              type="button"
              onClick={addIngredient}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-700 text-purple-400 hover:bg-gray-600 text-sm font-medium transition-colors"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
          {errors.ingredients && (
            <p className="text-rose-400 text-xs">{errors.ingredients}</p>
          )}
          <div className="space-y-2">
            {values.ingredients.map((ingredient, index) => (
              <IngredientRow
                key={ingredient.id}
                ingredient={ingredient}
                mode="edit"
                index={index}
                onUpdate={(idx, field, value) =>
                  updateIngredient(idx, field, value)
                }
                onRemove={removeIngredient}
              />
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="p-6 rounded bg-gray-800 border border-gray-700 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Steps *</h2>
            <button
              type="button"
              onClick={addStep}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-gray-700 text-purple-400 hover:bg-gray-600 text-sm font-medium transition-colors"
            >
              <Plus size={14} />
              Add
            </button>
          </div>
          {errors.steps && (
            <p className="text-rose-400 text-xs">{errors.steps}</p>
          )}
          <div className="space-y-3">
            {values.steps.map((step, index) => (
              <StepCard
                key={`step-${index}`}
                step={step}
                mode="edit"
                index={index}
                totalSteps={values.steps.length}
                onUpdate={updateStep}
                onRemove={removeStep}
                onMove={moveStep}
              />
            ))}
          </div>
        </section>

        {/* Nutrition */}
        <section className="p-6 rounded bg-gray-800 border border-gray-700 space-y-4">
          <h2 className="text-lg font-bold text-white">Nutrition (Optional)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { key: "calories", label: "Calories", unit: "kcal" },
              { key: "proteinG", label: "Protein", unit: "g" },
              { key: "carbsG", label: "Carbs", unit: "g" },
              { key: "fatG", label: "Fat", unit: "g" },
              { key: "fiberG", label: "Fiber", unit: "g" },
            ].map(({ key, label, unit }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {label} ({unit})
                </label>
                <input
                  type="number"
                  min={0}
                  value={values.nutrition[key as keyof typeof values.nutrition]}
                  onChange={(e) =>
                    handleChange("nutrition", {
                      ...values.nutrition,
                      [key]: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              handleSubmit((formValues) => onSave(formValues, false))
            }
            className="flex items-center justify-center gap-2 px-6 py-3 rounded border border-gray-700 text-gray-300 font-semibold hover:bg-gray-800 transition-colors"
          >
            <Save size={18} />
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() =>
              handleSubmit((formValues) => onSave(formValues, true))
            }
            className="flex items-center justify-center gap-2 px-6 py-3 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            <Eye size={18} />
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
