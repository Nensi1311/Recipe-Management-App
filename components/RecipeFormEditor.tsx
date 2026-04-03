"use client";

import { useState } from "react";
import { useRecipeForm } from "@/hooks/useRecipeForm";
import { Recipe, DietaryTag, Difficulty, MeasurementUnit, Nutrition } from "@/types/recipe";
import { IngredientRow } from "./IngredientRow";
import { StepCard } from "./StepCard";

const CATEGORIES = ["Breakfast", "Brunch", "Lunch", "Dinner", "Dessert", "Snack", "Soup", "Salad", "Drink"];
const DIETARY_TAGS: DietaryTag[] = ["vegan", "vegetarian", "gluten-free", "dairy-free", "keto", "paleo", "nut-free"];

interface Props {
  initialValues?: Partial<Recipe>;
  onSubmit: (values: Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export function RecipeFormEditor({ initialValues, onSubmit, isLoading, mode }: Props) {
  const {
    values, handleChange, errors, handleSubmit, reset, isDirty,
    addIngredient, updateIngredient, removeIngredient,
    addStep, updateStep, removeStep, moveStep,
  } = useRecipeForm(initialValues);

  const [nutritionOpen, setNutritionOpen] = useState(!!initialValues?.nutrition);
  const [autoSlug, setAutoSlug] = useState(mode === "create");

  const slugify = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

  const handleTitleChange = (val: string) => {
    handleChange("title", val);
    if (autoSlug) {
      // slug is computed server-side; just for display
    }
  };

  const toggleTag = (tag: DietaryTag) => {
    const tags = values.dietaryTags.includes(tag)
      ? values.dietaryTags.filter((t) => t !== tag)
      : [...values.dietaryTags, tag];
    handleChange("dietaryTags", tags);
  };

  const handleNutritionChange = (field: keyof Nutrition, val: number) => {
    const current = values.nutrition ?? { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 };
    handleChange("nutrition", { ...current, [field]: val });
  };

  const inputCls = "w-full px-3 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:text-stone-100";
  const labelCls = "text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-1.5";

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit); }} className="space-y-8">
      {/* Basic Info */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">Basic Information</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className={labelCls}>Title *</label>
            <input
              type="text"
              value={values.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputCls}
              placeholder="e.g. Creamy Tuscan Pasta"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className={`${inputCls} resize-none`}
              rows={3}
              placeholder="A short description of this recipe..."
            />
          </div>

          <div>
            <label className={labelCls}>Category</label>
            <select
              value={values.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={inputCls}
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Difficulty</label>
            <select
              value={values.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value as Difficulty)}
              className={inputCls}
            >
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Servings *</label>
            <input
              type="number"
              min={1}
              value={values.servings}
              onChange={(e) => handleChange("servings", parseInt(e.target.value) || 1)}
              className={inputCls}
            />
            {errors.servings && <p className="text-red-500 text-xs mt-1">{errors.servings}</p>}
          </div>

          <div>
            <label className={labelCls}>Cover Image URL</label>
            <input
              type="url"
              value={values.coverImageUrl ?? ""}
              onChange={(e) => handleChange("coverImageUrl", e.target.value)}
              className={inputCls}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className={labelCls}>Prep Time (minutes)</label>
            <input
              type="number"
              min={0}
              value={values.prepTimeMinutes}
              onChange={(e) => handleChange("prepTimeMinutes", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Cook Time (minutes)</label>
            <input
              type="number"
              min={0}
              value={values.cookTimeMinutes}
              onChange={(e) => handleChange("cookTimeMinutes", parseInt(e.target.value) || 0)}
              className={inputCls}
            />
          </div>
        </div>

        {/* Dietary Tags */}
        <div>
          <label className={labelCls}>Dietary Tags</label>
          <div className="flex flex-wrap gap-2">
            {DIETARY_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  values.dietaryTags.includes(tag)
                    ? "bg-sage-500 text-white border-sage-500"
                    : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-sage-400"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={values.published}
              onChange={(e) => handleChange("published", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:ring-2 peer-focus:ring-brand-400 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500" />
          </label>
          <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
            {values.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            Ingredients * <span className="text-sm font-normal text-stone-500">({values.ingredients.length})</span>
          </h2>
          <button
            type="button"
            onClick={addIngredient}
            className="text-sm font-medium px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
          >
            + Add Ingredient
          </button>
        </div>
        {errors.ingredients && <p className="text-red-500 text-xs mb-3">{errors.ingredients}</p>}
        <div className="space-y-2">
          {values.ingredients.map((ing, i) => (
            <IngredientRow
              key={ing.id}
              ingredient={ing}
              index={i}
              editable
              onChange={updateIngredient}
              onRemove={removeIngredient}
              canRemove={values.ingredients.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
            Steps * <span className="text-sm font-normal text-stone-500">({values.steps.length})</span>
          </h2>
          <button
            type="button"
            onClick={addStep}
            className="text-sm font-medium px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
          >
            + Add Step
          </button>
        </div>
        {errors.steps && <p className="text-red-500 text-xs mb-3">{errors.steps}</p>}
        <div className="space-y-3">
          {values.steps.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              editable
              onChange={updateStep}
              onRemove={removeStep}
              onMoveUp={(idx) => moveStep(idx, idx - 1)}
              onMoveDown={(idx) => moveStep(idx, idx + 1)}
              isFirst={i === 0}
              isLast={i === values.steps.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Nutrition (collapsible) */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6">
        <button
          type="button"
          onClick={() => setNutritionOpen(!nutritionOpen)}
          className="flex items-center gap-2 w-full text-left"
        >
          <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100 flex-1">
            Nutrition (per serving) <span className="text-sm font-normal text-stone-500">optional</span>
          </h2>
          <span className="text-stone-400">{nutritionOpen ? "▲" : "▼"}</span>
        </button>

        {nutritionOpen && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-5">
            {(["calories", "proteinG", "carbsG", "fatG", "fiberG"] as (keyof Nutrition)[]).map((field) => (
              <div key={field}>
                <label className={labelCls}>{field.replace("G", " (g)").replace("calories", "Calories")}</label>
                <input
                  type="number"
                  min={0}
                  step={0.1}
                  value={values.nutrition?.[field] ?? ""}
                  onChange={(e) => handleNutritionChange(field, parseFloat(e.target.value) || 0)}
                  className={inputCls}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 flex-wrap">
        {mode === "edit" && (
          <button
            type="button"
            onClick={() => {
              handleChange("published", false);
              handleSubmit(onSubmit);
            }}
            className="px-6 py-3 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold rounded-full hover:bg-stone-300 transition-colors"
          >
            Save as Draft
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 disabled:opacity-50 transition-colors shadow-md shadow-brand-500/30"
        >
          {isLoading ? "Saving..." : mode === "create" ? "Create Recipe" : "Publish Recipe"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-5 py-3 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 text-sm font-medium transition-colors"
        >
          Reset
        </button>
        {isDirty && (
          <span className="text-xs text-amber-600 dark:text-amber-400">• Unsaved changes</span>
        )}
      </div>
    </form>
  );
}
