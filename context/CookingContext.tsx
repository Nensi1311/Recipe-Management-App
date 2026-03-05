"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { MeasurementUnit } from "@/types/recipe";

type UnitSystem = "metric" | "imperial";
type Theme = "light" | "dark";

interface CookingContextType {
  servingMultiplier: number;
  unitSystem: UnitSystem;
  theme: Theme;
  setServingMultiplier: (multiplier: number) => void;
  scaleIngredient: (quantity: number) => number;
  setUnitSystem: (system: UnitSystem) => void;
  convertUnit: (quantity: number, unit: MeasurementUnit) => string;
  toggleTheme: () => void;
}

const CookingContext = createContext<CookingContextType | undefined>(undefined);

const metricToImperial: Partial<
  Record<MeasurementUnit, { factor: number; unit: string }>
> = {
  [MeasurementUnit.Gram]: { factor: 0.03527396, unit: "oz" },
  [MeasurementUnit.Kilogram]: { factor: 2.20462, unit: "lb" },
  [MeasurementUnit.Milliliter]: { factor: 0.033814, unit: "fl oz" },
  [MeasurementUnit.Liter]: { factor: 33.814, unit: "fl oz" },
};

export function CookingProvider({ children }: { children: ReactNode }) {
  const [servingMultiplier, setServingMultiplierState] = useState<number>(1);
  const [unitSystem, setUnitSystemState] = useState<UnitSystem>("metric");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cooking-preferences");
      if (saved) {
        const prefs = JSON.parse(saved) as {
          servingMultiplier?: number;
          unitSystem?: UnitSystem;
          theme?: Theme;
        };
        if (prefs.servingMultiplier)
          setServingMultiplierState(prefs.servingMultiplier);
        if (prefs.unitSystem) setUnitSystemState(prefs.unitSystem);
        if (prefs.theme) setThemeState(prefs.theme);
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(
      "cooking-preferences",
      JSON.stringify({ servingMultiplier, unitSystem, theme }),
    );
  }, [servingMultiplier, unitSystem, theme, isHydrated]);

  // Apply theme to document
  useEffect(() => {
    if (!isHydrated) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, isHydrated]);

  const setServingMultiplier = useCallback((m: number) => {
    setServingMultiplierState(Math.max(0.25, m));
  }, []);

  const scaleIngredient = useCallback(
    (quantity: number): number => {
      return Math.round(quantity * servingMultiplier * 100) / 100;
    },
    [servingMultiplier],
  );

  const setUnitSystem = useCallback((system: UnitSystem) => {
    setUnitSystemState(system);
  }, []);

  const convertUnit = useCallback(
    (quantity: number, unit: MeasurementUnit): string => {
      const scaled = Math.round(quantity * servingMultiplier * 100) / 100;
      if (unitSystem === "imperial" && metricToImperial[unit]) {
        const conversion = metricToImperial[unit]!;
        const converted = Math.round(scaled * conversion.factor * 100) / 100;
        return `${converted} ${conversion.unit}`;
      }
      return `${scaled} ${unit}`;
    },
    [servingMultiplier, unitSystem],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <CookingContext.Provider
      value={{
        servingMultiplier,
        unitSystem,
        theme,
        setServingMultiplier,
        scaleIngredient,
        setUnitSystem,
        convertUnit,
        toggleTheme,
      }}
    >
      {children}
    </CookingContext.Provider>
  );
}

export function useCooking(): CookingContextType {
  const context = useContext(CookingContext);
  if (!context) {
    throw new Error("useCooking must be used within a CookingProvider");
  }
  return context;
}
