import { useState, useCallback } from "react";
import {
  Recipe,
  Ingredient,
  RecipeStep,
  Nutrition,
  Difficulty,
  DietaryTag,
  MeasurementUnit,
} from "@/types/recipe";

interface FormValues {
  title: string;
  description: string;
  coverImageUrl: string;
  category: string;
  difficulty: Difficulty;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  dietaryTags: DietaryTag[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  nutrition: Nutrition;
  published: boolean;
}

interface FormErrors {
  title?: string;
  ingredients?: string;
  steps?: string;
  servings?: string;
  general?: string;
}

interface UseRecipeFormReturn {
  values: FormValues;
  handleChange: (
    field: keyof FormValues,
    value: FormValues[keyof FormValues],
  ) => void;
  errors: FormErrors;
  handleSubmit: (
    onSubmit: (values: FormValues) => void | Promise<void>,
  ) => void;
  reset: () => void;
  isDirty: boolean;
  addIngredient: () => void;
  updateIngredient: (
    index: number,
    field: keyof Ingredient,
    value: string | number | boolean,
  ) => void;
  removeIngredient: (index: number) => void;
  addStep: () => void;
  updateStep: (
    index: number,
    field: keyof RecipeStep,
    value: string | number,
  ) => void;
  removeStep: (index: number) => void;
  moveStep: (index: number, direction: "up" | "down") => void;
}

const emptyIngredient = (): Ingredient => ({
  id: Math.random().toString(36).substring(2, 10),
  name: "",
  quantity: 0,
  unit: MeasurementUnit.Gram,
  optional: false,
});

const emptyStep = (stepNumber: number): RecipeStep => ({
  stepNumber,
  instruction: "",
  durationMinutes: 0,
  tip: "",
});

const defaultValues: FormValues = {
  title: "",
  description: "",
  coverImageUrl: "",
  category: "",
  difficulty: Difficulty.Easy,
  servings: 1,
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  dietaryTags: [],
  ingredients: [emptyIngredient()],
  steps: [emptyStep(1)],
  nutrition: { calories: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 },
  published: false,
};

export function useRecipeForm(initialRecipe?: Recipe): UseRecipeFormReturn {
  const initial: FormValues = initialRecipe
    ? {
        title: initialRecipe.title,
        description: initialRecipe.description,
        coverImageUrl: initialRecipe.coverImageUrl,
        category: initialRecipe.category,
        difficulty: initialRecipe.difficulty,
        servings: initialRecipe.servings,
        prepTimeMinutes: initialRecipe.prepTimeMinutes,
        cookTimeMinutes: initialRecipe.cookTimeMinutes,
        dietaryTags: initialRecipe.dietaryTags,
        ingredients: initialRecipe.ingredients,
        steps: initialRecipe.steps,
        nutrition: initialRecipe.nutrition,
        published: initialRecipe.published,
      }
    : defaultValues;

  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback(
    (field: keyof FormValues, value: FormValues[keyof FormValues]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setIsDirty(true);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    if (!values.title || values.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (
      !values.ingredients ||
      values.ingredients.length < 1 ||
      !values.ingredients.some((i) => i.name.trim())
    ) {
      newErrors.ingredients = "At least 1 ingredient required";
    }
    if (
      !values.steps ||
      values.steps.length < 1 ||
      !values.steps.some((s) => s.instruction.trim())
    ) {
      newErrors.steps = "At least 1 step required";
    }
    if (!values.servings || values.servings < 1) {
      newErrors.servings = "Servings must be at least 1";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (onSubmit: (values: FormValues) => void | Promise<void>) => {
      if (validate()) {
        // Filter out empty ingredients and steps
        const cleanedValues: FormValues = {
          ...values,
          ingredients: values.ingredients.filter((i) => i.name.trim()),
          steps: values.steps
            .filter((s) => s.instruction.trim())
            .map((s, idx) => ({ ...s, stepNumber: idx + 1 })),
        };
        onSubmit(cleanedValues);
      }
    },
    [validate, values],
  );

  const reset = useCallback(() => {
    setValues(initial);
    setErrors({});
    setIsDirty(false);
  }, [initial]);

  const addIngredient = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, emptyIngredient()],
    }));
    setIsDirty(true);
  }, []);

  const updateIngredient = useCallback(
    (
      index: number,
      field: keyof Ingredient,
      value: string | number | boolean,
    ) => {
      setValues((prev) => {
        const updated = [...prev.ingredients];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, ingredients: updated };
      });
      setIsDirty(true);
    },
    [],
  );

  const removeIngredient = useCallback((index: number) => {
    setValues((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
    setIsDirty(true);
  }, []);

  const addStep = useCallback(() => {
    setValues((prev) => ({
      ...prev,
      steps: [...prev.steps, emptyStep(prev.steps.length + 1)],
    }));
    setIsDirty(true);
  }, []);

  const updateStep = useCallback(
    (index: number, field: keyof RecipeStep, value: string | number) => {
      setValues((prev) => {
        const updated = [...prev.steps];
        updated[index] = { ...updated[index], [field]: value };
        return { ...prev, steps: updated };
      });
      setIsDirty(true);
    },
    [],
  );

  const removeStep = useCallback((index: number) => {
    setValues((prev) => ({
      ...prev,
      steps: prev.steps
        .filter((_, i) => i !== index)
        .map((s, idx) => ({ ...s, stepNumber: idx + 1 })),
    }));
    setIsDirty(true);
  }, []);

  const moveStep = useCallback((index: number, direction: "up" | "down") => {
    setValues((prev) => {
      const steps = [...prev.steps];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= steps.length) return prev;

      [steps[index], steps[targetIndex]] = [steps[targetIndex], steps[index]];
      const renumbered = steps.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
      return { ...prev, steps: renumbered };
    });
    setIsDirty(true);
  }, []);

  return {
    values,
    handleChange,
    errors,
    handleSubmit,
    reset,
    isDirty,
    addIngredient,
    updateIngredient,
    removeIngredient,
    addStep,
    updateStep,
    removeStep,
    moveStep,
  };
}
