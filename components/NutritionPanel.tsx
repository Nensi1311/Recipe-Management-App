"use client";

import { Nutrition } from "@/types/recipe";

interface NutritionPanelProps {
  nutrition: Nutrition;
  servingMultiplier?: number;
  className?: string;
}

export function NutritionPanel({ nutrition, servingMultiplier = 1, className = "" }: NutritionPanelProps) {
  const scale = (val: number) => Math.round(val * servingMultiplier * 10) / 10;

  const calories = scale(nutrition.calories);
  const protein = scale(nutrition.proteinG);
  const carbs = scale(nutrition.carbsG);
  const fat = scale(nutrition.fatG);
  const fiber = scale(nutrition.fiberG);

  const macros = [
    { label: "Protein", value: protein, unit: "g", color: "bg-blue-500", max: calories / 4 },
    { label: "Carbs", value: carbs, unit: "g", color: "bg-amber-500", max: calories / 4 },
    { label: "Fat", value: fat, unit: "g", color: "bg-rose-500", max: calories / 9 },
    { label: "Fiber", value: fiber, unit: "g", color: "bg-emerald-500", max: 40 },
  ];

  return (
    <div className={`bg-stone-50 dark:bg-stone-800 rounded-2xl p-5 border border-stone-200 dark:border-stone-700 ${className}`}>
      <h3 className="font-display font-semibold text-stone-900 dark:text-stone-100 mb-4">Nutrition Facts</h3>

      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-stone-200 dark:border-stone-700">
        <div className="text-4xl font-bold text-brand-500">{calories}</div>
        <div>
          <div className="text-xs text-stone-500 dark:text-stone-400 uppercase tracking-wide">Calories</div>
          <div className="text-xs text-stone-400 dark:text-stone-500">per serving</div>
        </div>
      </div>

      <div className="space-y-3">
        {macros.map(({ label, value, unit, color, max }) => {
          const pct = Math.min((value / max) * 100, 100);
          return (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-stone-700 dark:text-stone-300 font-medium">{label}</span>
                <span className="text-stone-600 dark:text-stone-400">{value}{unit}</span>
              </div>
              <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-stone-400 mt-4 text-center">per serving</p>
    </div>
  );
}
