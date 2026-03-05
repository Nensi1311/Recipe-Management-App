"use client";

import React from "react";
import { Nutrition } from "@/types/recipe";
import { Flame, Beef, Wheat, Droplets, Leaf } from "lucide-react";

interface NutritionPanelProps {
  nutrition: Nutrition;
  multiplier?: number;
}

interface MacroInfo {
  label: string;
  value: number;
  unit: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  max: number;
}

export default function NutritionPanel({
  nutrition,
  multiplier = 1,
}: NutritionPanelProps) {
  const scaled = {
    calories: Math.round(nutrition.calories * multiplier),
    proteinG: Math.round(nutrition.proteinG * multiplier * 10) / 10,
    carbsG: Math.round(nutrition.carbsG * multiplier * 10) / 10,
    fatG: Math.round(nutrition.fatG * multiplier * 10) / 10,
    fiberG: Math.round(nutrition.fiberG * multiplier * 10) / 10,
  };

  const macros: MacroInfo[] = [
    {
      label: "Calories",
      value: scaled.calories,
      unit: "kcal",
      color: "bg-orange-500",
      bgColor: "bg-orange-500/20",
      icon: <Flame size={18} className="text-orange-400" />,
      max: 2000,
    },
    {
      label: "Protein",
      value: scaled.proteinG,
      unit: "g",
      color: "bg-rose-500",
      bgColor: "bg-rose-500/20",
      icon: <Beef size={18} className="text-rose-400" />,
      max: 100,
    },
    {
      label: "Carbs",
      value: scaled.carbsG,
      unit: "g",
      color: "bg-blue-500",
      bgColor: "bg-blue-500/20",
      icon: <Wheat size={18} className="text-blue-400" />,
      max: 300,
    },
    {
      label: "Fat",
      value: scaled.fatG,
      unit: "g",
      color: "bg-amber-500",
      bgColor: "bg-amber-500/20",
      icon: <Droplets size={18} className="text-amber-400" />,
      max: 100,
    },
    {
      label: "Fiber",
      value: scaled.fiberG,
      unit: "g",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-500/20",
      icon: <Leaf size={18} className="text-emerald-400" />,
      max: 40,
    },
  ];

  return (
    <div className="p-5 rounded bg-gray-800 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4">Nutrition Facts</h3>
      <div className="space-y-4">
        {macros.map((macro) => {
          const percentage = Math.min((macro.value / macro.max) * 100, 100);
          return (
            <div key={macro.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {macro.icon}
                  <span className="text-sm font-medium text-gray-300">
                    {macro.label}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">
                  {macro.value} {macro.unit}
                </span>
              </div>
              <div className={`h-2 rounded ${macro.bgColor}`}>
                <div
                  className={`h-full rounded ${macro.color} transition-all duration-500 ease-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
