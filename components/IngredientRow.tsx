"use client";

import React from "react";
import { Ingredient, MeasurementUnit } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";
import { X, GripVertical } from "lucide-react";
import clsx from "clsx";

interface IngredientRowProps {
  ingredient: Ingredient;
  mode?: "read" | "edit";
  index?: number;
  onUpdate?: (
    index: number,
    field: keyof Ingredient,
    value: string | number | boolean,
  ) => void;
  onRemove?: (index: number) => void;
}

export default function IngredientRow({
  ingredient,
  mode = "read",
  index = 0,
  onUpdate,
  onRemove,
}: IngredientRowProps) {
  const { convertUnit } = useCooking();

  if (mode === "read") {
    const display = convertUnit(ingredient.quantity, ingredient.unit);
    return (
      <div className="flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-800 transition-colors group">
        <div className="w-2 h-2 rounded bg-purple-400 shrink-0" />
        <span className="text-white font-medium">{display}</span>
        <span className="text-gray-300">{ingredient.name}</span>
        {ingredient.optional && (
          <span className="text-xs text-gray-500 italic ml-auto">
            (optional)
          </span>
        )}
      </div>
    );
  }

  // Edit mode
  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded bg-gray-800 border border-gray-700">
      <GripVertical size={16} className="text-gray-600 shrink-0" />

      <input
        type="number"
        min={0}
        step={0.1}
        value={ingredient.quantity}
        onChange={(e) =>
          onUpdate?.(index, "quantity", parseFloat(e.target.value) || 0)
        }
        className="w-20 px-2 py-1.5 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
        placeholder="Qty"
      />

      <select
        value={ingredient.unit}
        onChange={(e) => onUpdate?.(index, "unit", e.target.value)}
        className="w-24 px-2 py-1.5 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
      >
        {Object.values(MeasurementUnit).map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={ingredient.name}
        onChange={(e) => onUpdate?.(index, "name", e.target.value)}
        className="flex-1 px-2 py-1.5 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
        placeholder="Ingredient name"
      />

      <label
        className={clsx(
          "flex items-center gap-1 text-xs cursor-pointer",
          ingredient.optional ? "text-amber-400" : "text-gray-500",
        )}
      >
        <input
          type="checkbox"
          checked={ingredient.optional}
          onChange={(e) => onUpdate?.(index, "optional", e.target.checked)}
          className="rounded border-gray-600"
        />
        Optional
      </label>

      <button
        onClick={() => onRemove?.(index)}
        className="p-1 rounded hover:bg-rose-500/20 text-gray-500 hover:text-rose-400 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
