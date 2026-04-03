"use client";

import { useCooking } from "@/context/CookingContext";
import { Ingredient, MeasurementUnit } from "@/types/recipe";

const UNITS: MeasurementUnit[] = ["g", "kg", "ml", "l", "tsp", "tbsp", "cup", "piece", "pinch", "to taste"];

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  scaled?: boolean;
  editable?: boolean;
  onChange?: (index: number, field: keyof Ingredient, value: string | number | boolean) => void;
  onRemove?: (index: number) => void;
  canRemove?: boolean;
  className?: string;
}

export function IngredientRow({
  ingredient,
  index,
  scaled = false,
  editable = false,
  onChange,
  onRemove,
  canRemove = true,
  className = "",
}: IngredientRowProps) {
  const { convertUnit, scaleIngredient } = useCooking();

  if (editable) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 ${className}`}>
        <input
          type="number"
          value={ingredient.quantity}
          min={0}
          step={0.1}
          onChange={(e) => onChange?.(index, "quantity", parseFloat(e.target.value) || 0)}
          className="w-20 px-2 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Qty"
        />
        <select
          value={ingredient.unit}
          onChange={(e) => onChange?.(index, "unit", e.target.value)}
          className="w-24 px-2 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
        >
          {UNITS.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <input
          type="text"
          value={ingredient.name}
          onChange={(e) => onChange?.(index, "name", e.target.value)}
          className="flex-1 px-2 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="Ingredient name"
        />
        <label className="flex items-center gap-1 text-xs text-stone-500 whitespace-nowrap">
          <input
            type="checkbox"
            checked={ingredient.optional}
            onChange={(e) => onChange?.(index, "optional", e.target.checked)}
            className="rounded accent-brand-500"
          />
          Optional
        </label>
        {canRemove && (
          <button
            onClick={() => onRemove?.(index)}
            className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-500 hover:bg-red-200 flex items-center justify-center text-sm transition-colors"
          >
            ×
          </button>
        )}
      </div>
    );
  }

  const displayQty = scaled ? convertUnit(ingredient.quantity, ingredient.unit) : `${ingredient.quantity} ${ingredient.unit}`;

  return (
    <div className={`flex items-center gap-3 py-2.5 border-b border-stone-100 dark:border-stone-800 last:border-0 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-brand-400 flex-shrink-0" />
      <span className="text-sm font-medium text-stone-700 dark:text-stone-300 w-28 flex-shrink-0">
        {displayQty}
      </span>
      <span className="text-sm text-stone-900 dark:text-stone-100 flex-1">
        {ingredient.name}
      </span>
      {ingredient.optional && (
        <span className="text-xs text-stone-400 italic">optional</span>
      )}
    </div>
  );
}
