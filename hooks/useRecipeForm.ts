import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Ingredient, MeasurementUnit, Recipe, RecipeStep } from "@/types/recipe";

type FormValues = Omit<Recipe, "id" | "slug" | "rating" | "ratingCount" | "createdAt" | "updatedAt">;

interface FormErrors {
  title?: string;
  ingredients?: string;
  steps?: string;
  servings?: string;
}

interface UseRecipeFormReturn {
  values: FormValues;
  handleChange: (field: keyof FormValues, value: FormValues[keyof FormValues]) => void;
  errors: FormErrors;
  handleSubmit: (onSubmit: (values: FormValues) => void) => void;
  reset: () => void;
  isDirty: boolean;
  addIngredient: () => void;
  updateIngredient: (index: number, field: keyof Ingredient, value: string | number | boolean) => void;
  removeIngredient: (index: number) => void;
  addStep: () => void;
  updateStep: (index: number, field: keyof RecipeStep, value: string | number) => void;
  removeStep: (index: number) => void;
  moveStep: (fromIndex: number, toIndex: number) => void;
}

const blankIngredient = (): Ingredient => ({
  id: uuidv4(),
  name: "",
  quantity: 1,
  unit: "g" as MeasurementUnit,
  optional: false,
});

const blankStep = (stepNumber: number): RecipeStep => ({
  stepNumber,
  instruction: "",
  durationMinutes: undefined,
  tip: undefined,
});

const defaultValues = (): FormValues => ({
  title: "",
  description: "",
  coverImageUrl: "",
  authorId: "user-1",
  category: "Dinner",
  dietaryTags: [],
  difficulty: "easy",
  servings: 4,
  prepTimeMinutes: 0,
  cookTimeMinutes: 0,
  ingredients: [blankIngredient()],
  steps: [blankStep(1)],
  nutrition: undefined,
  published: false,
});

export function useRecipeForm(initialValues?: Partial<Recipe>): UseRecipeFormReturn {
  const buildInitial = useCallback((): FormValues => {
    if (!initialValues) return defaultValues();
    return {
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
      coverImageUrl: initialValues.coverImageUrl ?? "",
      authorId: initialValues.authorId ?? "user-1",
      category: initialValues.category ?? "Dinner",
      dietaryTags: initialValues.dietaryTags ?? [],
      difficulty: initialValues.difficulty ?? "easy",
      servings: initialValues.servings ?? 4,
      prepTimeMinutes: initialValues.prepTimeMinutes ?? 0,
      cookTimeMinutes: initialValues.cookTimeMinutes ?? 0,
      ingredients: initialValues.ingredients ?? [blankIngredient()],
      steps: initialValues.steps ?? [blankStep(1)],
      nutrition: initialValues.nutrition,
      published: initialValues.published ?? false,
    };
  }, [initialValues]);

  const [values, setValues] = useState<FormValues>(buildInitial);
  const [originalValues, setOriginalValues] = useState<FormValues>(buildInitial);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const init = buildInitial();
    setValues(init);
    setOriginalValues(init);
  }, [buildInitial]);

  const isDirty = JSON.stringify(values) !== JSON.stringify(originalValues);

  const handleChange = useCallback(
    (field: keyof FormValues, value: FormValues[keyof FormValues]) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (values.title.length < 3) errs.title = "Title must be at least 3 characters";
    if (values.ingredients.length < 1) errs.ingredients = "At least 1 ingredient required";
    if (values.steps.length < 1) errs.steps = "At least 1 step required";
    if (values.servings < 1) errs.servings = "Servings must be at least 1";
    return errs;
  };

  const handleSubmit = (onSubmit: (values: FormValues) => void) => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit(values);
  };

  const reset = () => {
    const init = buildInitial();
    setValues(init);
    setOriginalValues(init);
    setErrors({});
  };

  const addIngredient = () => {
    setValues((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, blankIngredient()],
    }));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number | boolean
  ) => {
    setValues((prev) => {
      const updated = [...prev.ingredients];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, ingredients: updated };
    });
  };

  const removeIngredient = (index: number) => {
    setValues((prev) => {
      if (prev.ingredients.length <= 1) return prev;
      const updated = prev.ingredients.filter((_, i) => i !== index);
      return { ...prev, ingredients: updated };
    });
  };

  const addStep = () => {
    setValues((prev) => ({
      ...prev,
      steps: [...prev.steps, blankStep(prev.steps.length + 1)],
    }));
  };

  const updateStep = (index: number, field: keyof RecipeStep, value: string | number) => {
    setValues((prev) => {
      const updated = [...prev.steps];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, steps: updated };
    });
  };

  const removeStep = (index: number) => {
    setValues((prev) => {
      const updated = prev.steps
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, stepNumber: i + 1 }));
      return { ...prev, steps: updated };
    });
  };

  const moveStep = (fromIndex: number, toIndex: number) => {
    setValues((prev) => {
      const updated = [...prev.steps];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return {
        ...prev,
        steps: updated.map((s, i) => ({ ...s, stepNumber: i + 1 })),
      };
    });
  };

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
