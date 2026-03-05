"use client";

import { Ingredient, MeasurementUnit } from "@/types/recipe";
import { useCooking } from "@/context/CookingContext";
import { Trash2, GripVertical } from "lucide-react";

interface IngredientRowProps {
  ingredient: Ingredient;
  index: number;
  scaled?: boolean;
  editable?: boolean;
  onChange?: (
    index: number,
    field: keyof Ingredient,
    value: string | number | boolean,
  ) => void;
  onRemove?: (index: number) => void;
  canRemove?: boolean;
  className?: string;
}

export const IngredientRow = ({
  ingredient,
  index,
  scaled,
  editable,
  onChange,
  onRemove,
  canRemove,
  className,
}: IngredientRowProps) => {
  const { convertUnit, scaleIngredient } = useCooking();

  const displayQty = scaled
    ? scaleIngredient(ingredient.quantity)
    : ingredient.quantity;
  const display = convertUnit(displayQty, ingredient.unit);

  if (editable) {
    return (
      <div
        className={`flex gap-2 items-center mb-2 animate-fade-in ${className || ""}`}
      >
        <div className="cursor-grab active:cursor-grabbing text-text-muted">
          <GripVertical size={18} />
        </div>
        <input
          type="number"
          value={ingredient.quantity}
          onChange={(e) =>
            onChange?.(index, "quantity", parseFloat(e.target.value))
          }
          className="w-16 p-2 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
          placeholder="Qty"
        />
        <select
          value={ingredient.unit}
          onChange={(e) =>
            onChange?.(index, "unit", e.target.value as MeasurementUnit)
          }
          className="p-2 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
          <option value="cup">cup</option>
          <option value="piece">piece</option>
          <option value="pinch">pinch</option>
          <option value="to taste">to taste</option>
        </select>
        <input
          type="text"
          value={ingredient.name}
          onChange={(e) => onChange?.(index, "name", e.target.value)}
          className="flex-1 p-2 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
          placeholder="Ingredient name"
        />
        <label className="flex items-center gap-1 text-xs font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={ingredient.optional}
            onChange={(e) => onChange?.(index, "optional", e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          Opt.
        </label>
        {canRemove && (
          <button
            onClick={() => onRemove?.(index)}
            className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex justify-between py-3 border-b border-border items-center group transition-colors hover:bg-background/50 ${className || ""}`}
    >
      <div className="flex gap-2 font-medium">
        <span className="text-primary font-bold">{display}</span>
        <span className="text-text">{ingredient.name}</span>
      </div>
      {ingredient.optional && (
        <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted opacity-60 group-hover:opacity-100 transition-opacity">
          Optional
        </span>
      )}
    </div>
  );
};
