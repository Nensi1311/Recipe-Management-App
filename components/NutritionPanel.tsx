"use client";

import { Nutrition } from "@/types/recipe";

interface NutritionPanelProps {
  nutrition: Nutrition;
  servingMultiplier?: number;
  className?: string;
}

export const NutritionPanel = ({
  nutrition,
  servingMultiplier = 1,
  className,
}: NutritionPanelProps) => {
  const scale = (val: number) => Math.round(val * servingMultiplier);

  const macros = [
    {
      label: "Protein",
      value: scale(nutrition.proteinG),
      color: "bg-secondary",
      unit: "g",
    },
    {
      label: "Carbs",
      value: scale(nutrition.carbsG),
      color: "bg-accent",
      unit: "g",
    },
    {
      label: "Fat",
      value: scale(nutrition.fatG),
      color: "bg-primary",
      unit: "g",
    },
    {
      label: "Fiber",
      value: scale(nutrition.fiberG),
      color: "bg-indigo-400",
      unit: "g",
    },
  ];

  const totalCalories = scale(nutrition.calories);

  return (
    <div
      className={`bg-card rounded-lg border border-border p-6 shadow-sm ${className || ""}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-black uppercase tracking-tighter">
          Nutrition Facts
        </h3>
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
          per serving
        </span>
      </div>

      <div className="text-4xl font-black mb-8 text-center text-primary tabular-nums">
        {totalCalories}{" "}
        <span className="text-sm font-bold text-text-muted uppercase tracking-widest">
          kcal
        </span>
      </div>

      <div className="space-y-5">
        {macros.map((macro) => {
          // Calculate relative percentage for the bar (simplified for visualization)
          const percentage = Math.min(
            ((macro.value * 9) / totalCalories) * 100,
            100,
          );

          return (
            <div key={macro.label} className="group">
              <div className="flex justify-between mb-1.5 text-xs font-bold uppercase tracking-wide">
                <span className="text-text-muted group-hover:text-text transition-colors">
                  {macro.label}
                </span>
                <span className="tabular-nums">
                  {macro.value}
                  {macro.unit}
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${macro.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
