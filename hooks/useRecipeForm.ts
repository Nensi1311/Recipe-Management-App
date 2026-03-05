import { useState, useCallback } from "react";
import { Recipe, Ingredient, RecipeStep } from "@/types/recipe";

export const useRecipeForm = (initialValues?: Partial<Recipe>) => {
  const [values, setValues] = useState<Partial<Recipe>>({
    title: "",
    slug: "",
    description: "",
    category: "",
    difficulty: "medium",
    servings: 1,
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    ingredients: [],
    steps: [],
    dietaryTags: [],
    published: false,
    ...initialValues,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((field: keyof Recipe, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  }, []);

  const addIngredient = useCallback(() => {
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: "",
      quantity: 0,
      unit: "g",
      optional: false,
    };
    setValues((prev) => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), newIngredient],
    }));
    setIsDirty(true);
  }, []);

  const updateIngredient = useCallback(
    (index: number, field: keyof Ingredient, value: any) => {
      setValues((prev) => {
        const newIngredients = [...(prev.ingredients || [])];
        newIngredients[index] = { ...newIngredients[index], [field]: value };
        return { ...prev, ingredients: newIngredients };
      });
      setIsDirty(true);
    },
    [],
  );

  const removeIngredient = useCallback((index: number) => {
    setValues((prev) => {
      const newIngredients = [...(prev.ingredients || [])];
      if (newIngredients.length > 1) {
        newIngredients.splice(index, 1);
      }
      return { ...prev, ingredients: newIngredients };
    });
    setIsDirty(true);
  }, []);

  const addStep = useCallback(() => {
    setValues((prev) => {
      const newSteps = [...(prev.steps || [])];
      const newStep: RecipeStep = {
        stepNumber: newSteps.length + 1,
        instruction: "",
      };
      return { ...prev, steps: [...newSteps, newStep] };
    });
    setIsDirty(true);
  }, []);

  const updateStep = useCallback(
    (index: number, field: keyof RecipeStep, value: any) => {
      setValues((prev) => {
        const newSteps = [...(prev.steps || [])];
        newSteps[index] = { ...newSteps[index], [field]: value };
        return { ...prev, steps: newSteps };
      });
      setIsDirty(true);
    },
    [],
  );

  const removeStep = useCallback((index: number) => {
    setValues((prev) => {
      const newSteps = (prev.steps || [])
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, stepNumber: i + 1 }));
      return { ...prev, steps: newSteps };
    });
    setIsDirty(true);
  }, []);

  const moveStep = useCallback((fromIndex: number, toIndex: number) => {
    setValues((prev) => {
      const newSteps = [...(prev.steps || [])];
      const [movedStep] = newSteps.splice(fromIndex, 1);
      newSteps.splice(toIndex, 0, movedStep);
      const renumberedSteps = newSteps.map((step, i) => ({
        ...step,
        stepNumber: i + 1,
      }));
      return { ...prev, steps: renumberedSteps };
    });
    setIsDirty(true);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!values.title || values.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }
    if (!values.ingredients || values.ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required";
    }
    if (!values.steps || values.steps.length === 0) {
      newErrors.steps = "At least one step is required";
    }
    if (!values.servings || values.servings < 1) {
      newErrors.servings = "Servings must be at least 1";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSubmit: (data: Recipe) => Promise<void>) => {
    if (validate()) {
      await onSubmit(values as Recipe);
      setIsDirty(false);
    }
  };

  const reset = useCallback(() => {
    setValues(initialValues || {});
    setErrors({});
    setIsDirty(false);
  }, [initialValues]);

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
};
