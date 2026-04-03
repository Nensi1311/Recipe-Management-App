"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MeasurementUnit } from "@/types/recipe";

interface CookingContextValue {
  servingMultiplier: number;
  setServingMultiplier: (n: number) => void;
  scaleIngredient: (qty: number) => number;
  unitSystem: "metric" | "imperial";
  setUnitSystem: (s: "metric" | "imperial") => void;
  convertUnit: (qty: number, unit: MeasurementUnit) => string;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const CookingContext = createContext<CookingContextValue | undefined>(undefined);

const METRIC_TO_IMPERIAL: Partial<Record<MeasurementUnit, { factor: number; label: string }>> = {
  g: { factor: 0.035274, label: "oz" },
  kg: { factor: 2.20462, label: "lb" },
  ml: { factor: 0.033814, label: "fl oz" },
  l: { factor: 33.814, label: "fl oz" },
};

export function CookingProvider({ children }: { children: React.ReactNode }) {
  const [servingMultiplier, setServingMultiplierState] = useState(1);
  const [unitSystem, setUnitSystemState] = useState<"metric" | "imperial">("metric");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMultiplier = localStorage.getItem("servingMultiplier");
    const storedUnit = localStorage.getItem("unitSystem");
    const storedTheme = localStorage.getItem("theme");
    if (storedMultiplier) setServingMultiplierState(parseFloat(storedMultiplier));
    if (storedUnit === "metric" || storedUnit === "imperial") setUnitSystemState(storedUnit);
    if (storedTheme === "dark" || storedTheme === "light") setTheme(storedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, mounted]);

  const setServingMultiplier = useCallback((n: number) => {
    setServingMultiplierState(n);
    localStorage.setItem("servingMultiplier", String(n));
  }, []);

  const setUnitSystem = useCallback((s: "metric" | "imperial") => {
    setUnitSystemState(s);
    localStorage.setItem("unitSystem", s);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  const scaleIngredient = useCallback(
    (qty: number) => Math.round(qty * servingMultiplier * 100) / 100,
    [servingMultiplier]
  );

  const convertUnit = useCallback(
    (qty: number, unit: MeasurementUnit): string => {
      const scaledQty = Math.round(qty * servingMultiplier * 100) / 100;
      if (unitSystem === "imperial") {
        const conversion = METRIC_TO_IMPERIAL[unit];
        if (conversion) {
          const converted = Math.round(scaledQty * conversion.factor * 100) / 100;
          return `${converted} ${conversion.label}`;
        }
      }
      return `${scaledQty} ${unit}`;
    },
    [unitSystem, servingMultiplier]
  );

  return (
    <CookingContext.Provider
      value={{
        servingMultiplier,
        setServingMultiplier,
        scaleIngredient,
        unitSystem,
        setUnitSystem,
        convertUnit,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CookingContext.Provider>
  );
}

export function useCooking(): CookingContextValue {
  const ctx = useContext(CookingContext);
  if (!ctx) throw new Error("useCooking must be used within CookingProvider");
  return ctx;
}
