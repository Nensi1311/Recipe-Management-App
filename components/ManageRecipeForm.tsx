"use client";

import { useRecipeForm } from "@/hooks/useRecipeForm";
import {
  Recipe,
  DietaryTag,
  Difficulty,
  MeasurementUnit,
} from "@/types/recipe";
import {
  Save,
  Plus,
  Trash2,
  Clock,
  Users,
  ChefHat,
  Image as ImageIcon,
  Type,
  AlignLeft,
  ListOrdered,
  Tag,
  Flame,
  Activity,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface ManageRecipeFormProps {
  initialValues?: Partial<Recipe>;
  onSubmit: (data: Recipe) => Promise<void>;
  title: string;
}

const DIETARY_TAGS: DietaryTag[] = [
  "vegan",
  "vegetarian",
  "gluten-free",
  "dairy-free",
  "keto",
  "paleo",
  "nut-free",
];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];
const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
];
const UNITS: MeasurementUnit[] = [
  "g",
  "kg",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "piece",
  "pinch",
  "to taste",
];

export const ManageRecipeForm = ({
  initialValues,
  onSubmit,
  title,
}: ManageRecipeFormProps) => {
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
  } = useRecipeForm(initialValues);

  const [activeTab, setActiveTab] = useState<
    "basic" | "ingredients" | "steps" | "nutrition"
  >("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFormSubmit = async (data: Recipe) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagToggle = (tag: DietaryTag) => {
    const currentTags = values.dietaryTags || [];
    if (currentTags.includes(tag)) {
      handleChange(
        "dietaryTags",
        currentTags.filter((t) => t !== tag),
      );
    } else {
      handleChange("dietaryTags", [...currentTags, tag]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black tracking-tighter">{title}</h1>
        <button
          onClick={() => handleSubmit(onFormSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-3 px-8 py-3.5 bg-secondary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-secondary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {isSubmitting ? (
            <Activity className="animate-spin" size={18} />
          ) : (
            <Save size={18} />
          )}
          {isSubmitting ? "Saving..." : "Save Recipe"}
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-card border border-border rounded-2xl mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: "basic", label: "Basic Info", icon: <Type size={16} /> },
          {
            id: "ingredients",
            label: "Ingredients",
            icon: <ChefHat size={16} />,
          },
          { id: "steps", label: "Method", icon: <ListOrdered size={16} /> },
          { id: "nutrition", label: "Nutrition", icon: <Activity size={16} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-muted hover:bg-background"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm min-h-[500px]">
        {/* Basic Info Tab */}
        {activeTab === "basic" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
                  Recipe Title
                </label>
                <input
                  type="text"
                  value={values.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Grandma's Secret Pasta"
                  className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                {errors.title && (
                  <p className="text-secondary text-[10px] font-black uppercase px-1">
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
                  Category
                </label>
                <select
                  value={values.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
                Description
              </label>
              <textarea
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Tell the story of this dish..."
                rows={3}
                className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 flex items-center gap-1">
                  <Users size={12} /> Servings
                </label>
                <input
                  type="number"
                  value={values.servings}
                  onChange={(e) =>
                    handleChange("servings", parseInt(e.target.value))
                  }
                  className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 flex items-center gap-1">
                  <Clock size={12} /> Prep Time (min)
                </label>
                <input
                  type="number"
                  value={values.prepTimeMinutes}
                  onChange={(e) =>
                    handleChange("prepTimeMinutes", parseInt(e.target.value))
                  }
                  className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1 flex items-center gap-1">
                  <Flame size={12} /> Cook Time (min)
                </label>
                <input
                  type="number"
                  value={values.cookTimeMinutes}
                  onChange={(e) =>
                    handleChange("cookTimeMinutes", parseInt(e.target.value))
                  }
                  className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
                Dietary Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {DIETARY_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      values.dietaryTags?.includes(tag)
                        ? "bg-secondary text-white shadow-md shadow-secondary/20"
                        : "bg-background border border-border text-text-muted hover:border-text-muted"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between p-4 bg-background rounded-2xl border border-border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${values.published ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-text-muted"}`}
                  />
                  <span className="font-black text-xs uppercase tracking-widest">
                    Recipe Visibility
                  </span>
                </div>
                <button
                  onClick={() => handleChange("published", !values.published)}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${values.published ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${values.published ? "left-7" : "left-1"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-black">Recipe Ingredients</h3>
                <p className="text-text-muted text-sm font-medium">
                  Add all ingredients needed for this dish
                </p>
              </div>
              <button
                onClick={addIngredient}
                className="flex items-center gap-2 px-5 py-3 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20"
              >
                <Plus size={14} /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {(values.ingredients || []).map((ing, idx) => (
                <div
                  key={ing.id}
                  className="grid grid-cols-12 gap-3 p-4 bg-background border border-border rounded-2xl"
                >
                  <div className="col-span-12 md:col-span-5">
                    <input
                      placeholder="Ingredient name"
                      value={ing.name}
                      onChange={(e) =>
                        updateIngredient(idx, "name", e.target.value)
                      }
                      className="w-full bg-transparent font-bold outline-none border-b border-border focus:border-primary transition-colors py-1"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={ing.quantity}
                      onChange={(e) =>
                        updateIngredient(
                          idx,
                          "quantity",
                          parseFloat(e.target.value),
                        )
                      }
                      className="w-full bg-transparent font-bold outline-none border-b border-border focus:border-primary transition-colors py-1"
                    />
                  </div>
                  <div className="col-span-5 md:col-span-3">
                    <select
                      value={ing.unit}
                      onChange={(e) =>
                        updateIngredient(idx, "unit", e.target.value)
                      }
                      className="w-full bg-transparent font-black text-[10px] uppercase tracking-widest outline-none border-b border-border focus:border-primary transition-colors py-1"
                    >
                      {UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-3 md:col-span-2 flex justify-end">
                    <button
                      onClick={() => removeIngredient(idx)}
                      className="p-2 text-text-muted hover:text-secondary transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {(values.ingredients || []).length === 0 && (
                <div className="text-center py-12 px-6 border border-dashed border-border rounded-3xl opacity-50">
                  <ChefHat size={32} className="mx-auto mb-3" />
                  <p className="font-bold text-sm">No ingredients added yet</p>
                </div>
              )}
            </div>
            {errors.ingredients && (
              <p className="text-secondary text-[10px] font-black uppercase">
                {errors.ingredients}
              </p>
            )}
          </div>
        )}

        {/* Steps Tab */}
        {activeTab === "steps" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-black">Method of Preparation</h3>
                <p className="text-text-muted text-sm font-medium">
                  Describe each step in detail
                </p>
              </div>
              <button
                onClick={addStep}
                className="flex items-center gap-2 px-5 py-3 bg-secondary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20"
              >
                <Plus size={14} /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {(values.steps || []).map((step, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-border rounded-3xl p-6 relative group shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black italic">
                        {idx + 1}
                      </div>
                      <h4 className="font-black uppercase tracking-widest text-[10px]">
                        Step Instructions
                      </h4>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => idx > 0 && moveStep(idx, idx - 1)}
                        className="p-1.5 text-text-muted hover:text-primary transition-colors disabled:opacity-30"
                        disabled={idx === 0}
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        onClick={() =>
                          idx < (values.steps?.length || 0) - 1 &&
                          moveStep(idx, idx + 1)
                        }
                        className="p-1.5 text-text-muted hover:text-primary transition-colors disabled:opacity-30"
                        disabled={idx === (values.steps?.length || 0) - 1}
                      >
                        <ChevronDown size={16} />
                      </button>
                      <div className="w-px h-4 bg-border mx-1" />
                      <button
                        onClick={() => removeStep(idx)}
                        className="p-1.5 text-text-muted hover:text-secondary transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={step.instruction}
                    onChange={(e) =>
                      updateStep(idx, "instruction", e.target.value)
                    }
                    placeholder="What should the chef do in this step?"
                    rows={2}
                    className="w-full bg-transparent font-bold outline-none resize-none mb-4 border-b border-border focus:border-primary transition-colors py-2"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-card/50 p-3 rounded-xl border border-border/50">
                      <Clock size={14} className="text-secondary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                        Timer (min)
                      </span>
                      <input
                        type="number"
                        value={step.durationMinutes || ""}
                        onChange={(e) =>
                          updateStep(
                            idx,
                            "durationMinutes",
                            parseInt(e.target.value),
                          )
                        }
                        className="w-16 bg-transparent font-bold text-center outline-none border-b border-border focus:border-secondary"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-card/50 p-3 rounded-xl border border-border/50">
                      <Tag size={14} className="text-accent" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                        Chef Tip
                      </span>
                      <input
                        value={step.tip || ""}
                        onChange={(e) => updateStep(idx, "tip", e.target.value)}
                        placeholder="Short advice..."
                        className="flex-1 bg-transparent font-bold outline-none border-b border-border focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(values.steps || []).length === 0 && (
                <div className="text-center py-12 px-6 border border-dashed border-border rounded-3xl opacity-50">
                  <ListOrdered size={32} className="mx-auto mb-3" />
                  <p className="font-bold text-sm">No steps added yet</p>
                </div>
              )}
            </div>
            {errors.steps && (
              <p className="text-secondary text-[10px] font-black uppercase">
                {errors.steps}
              </p>
            )}
          </div>
        )}

        {/* Nutrition Tab */}
        {activeTab === "nutrition" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-xl font-black mb-2">
                Nutritional Information
              </h3>
              <p className="text-text-muted text-sm font-medium">
                Estimated values per single serving
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { key: "calories", label: "Calories", unit: "kcal" },
                { key: "proteinG", label: "Protein", unit: "g" },
                { key: "carbsG", label: "Carbs", unit: "g" },
                { key: "fatG", label: "Fat", unit: "g" },
                { key: "fiberG", label: "Fiber", unit: "g" },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted px-1">
                    {item.label} ({item.unit})
                  </label>
                  <input
                    type="number"
                    value={
                      values.nutrition?.[
                        item.key as keyof typeof values.nutrition
                      ] || ""
                    }
                    onChange={(e) =>
                      handleChange("nutrition", {
                        ...values.nutrition,
                        [item.key]: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-5 py-4 bg-background border border-border rounded-2xl font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-3xl flex items-center gap-6">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                <Activity size={32} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-black text-secondary uppercase tracking-widest text-xs mb-1">
                  Expert Advice
                </h4>
                <p className="text-sm font-medium leading-relaxed opacity-80">
                  Accurate nutritional data helps home cooks stay healthy. If
                  you don't have exact numbers, you can leave these fields
                  empty.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="px-8 py-4 font-black text-xs uppercase tracking-widest text-text-muted hover:text-text transition-colors">
          Discard Changes
        </button>
        <button
          onClick={() => handleSubmit(onFormSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-3 px-10 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {isSubmitting ? (
            <Activity className="animate-spin" size={20} />
          ) : (
            <Save size={20} />
          )}
          {isSubmitting ? "Processing..." : "Finish & Save"}
        </button>
      </div>
    </div>
  );
};
