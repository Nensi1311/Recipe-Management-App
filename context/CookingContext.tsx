"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MeasurementUnit } from "@/types/recipe";

interface CookingContextValue {
  servingMultiplier: number; // e.g., 2.0 means double the recipe
  setServingMultiplier: (n: number) => void;
  scaleIngredient: (qty: number) => number;
  unitSystem: "metric" | "imperial";
  setUnitSystem: (s: "metric" | "imperial") => void;
  toggleUnitSystem: () => void;
  convertUnit: (qty: number, unit: MeasurementUnit) => string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const CookingContext = createContext<CookingContextValue | undefined>(
  undefined,
);

export const CookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Persistence
  useEffect(() => {
    const savedUnit = localStorage.getItem("unitSystem") as
      | "metric"
      | "imperial";
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const savedMultiplier = localStorage.getItem("servingMultiplier");

    if (savedUnit) setUnitSystem(savedUnit);
    if (savedTheme) setTheme(savedTheme);
    if (savedMultiplier) setServingMultiplier(parseFloat(savedMultiplier));
  }, []);

  useEffect(() => {
    localStorage.setItem("unitSystem", unitSystem);
    localStorage.setItem("theme", theme);
    localStorage.setItem("servingMultiplier", servingMultiplier.toString());
    document.documentElement.setAttribute("data-theme", theme);
  }, [unitSystem, theme, servingMultiplier]);

  const scaleIngredient = (qty: number) => {
    return Math.round(qty * servingMultiplier * 100) / 100;
  };

  const convertUnit = (qty: number, unit: MeasurementUnit): string => {
    if (unitSystem === "metric") return `${qty} ${unit}`;

    // Basic conversions for Metric to Imperial
    let newQty = qty;
    let newUnit = unit;

    switch (unit) {
      case "g":
        newQty = qty * 0.035274;
        newUnit = "oz" as any;
        break;
      case "kg":
        newQty = qty * 2.20462;
        newUnit = "lb" as any;
        break;
      case "ml":
        newQty = qty * 0.033814;
        newUnit = "fl oz" as any;
        break;
      case "l":
        newQty = qty * 0.264172; // gallon or quart? Usually fl oz or cups in recipes.
        // Keeping it simple as per PDF example "2.5 oz"
        break;
      default:
        break;
    }

    const roundedQty = Math.round(newQty * 100) / 100;
    return `${roundedQty} ${newUnit}`;
  };

  const toggleUnitSystem = () => {
    setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <CookingContext.Provider
      value={{
        servingMultiplier,
        setServingMultiplier,
        scaleIngredient,
        unitSystem,
        setUnitSystem,
        toggleUnitSystem,
        convertUnit,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CookingContext.Provider>
  );
};

export const useCooking = () => {
  const context = useContext(CookingContext);
  if (!context)
    throw new Error("useCooking must be used within a CookingProvider");
  return context;
};
