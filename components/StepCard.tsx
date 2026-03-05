"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { RecipeStep } from "@/types/recipe";
import { ChevronUp, ChevronDown, X, Timer, Lightbulb } from "lucide-react";
import clsx from "clsx";

interface StepCardProps {
  step: RecipeStep;
  mode?: "read" | "edit";
  index?: number;
  totalSteps?: number;
  activeTimerStep?: number | null;
  onStartTimer?: (stepNumber: number, minutes: number) => void;
  onUpdate?: (
    index: number,
    field: keyof RecipeStep,
    value: string | number,
  ) => void;
  onRemove?: (index: number) => void;
  onMove?: (index: number, direction: "up" | "down") => void;
}

export default function StepCard({
  step,
  mode = "read",
  index = 0,
  totalSteps = 1,
  activeTimerStep,
  onStartTimer,
  onUpdate,
  onRemove,
  onMove,
}: StepCardProps) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isTimerActive = activeTimerStep === step.stepNumber;

  useEffect(() => {
    if (!isTimerActive && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeLeft(null);
    }
  }, [isTimerActive]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleStartTimer = useCallback(() => {
    if (step.durationMinutes <= 0) return;
    onStartTimer?.(step.stepNumber, step.durationMinutes);
    setTimeLeft(step.durationMinutes * 60);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [step.durationMinutes, step.stepNumber, onStartTimer]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  if (mode === "read") {
    return (
      <div className="flex gap-4 p-4 rounded bg-gray-800 border border-gray-700 hover:border-gray-600 transition-colors">
        {/* Step number */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
          {step.stepNumber}
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-gray-200 leading-relaxed">{step.instruction}</p>

          {step.tip && (
            <div className="flex items-start gap-2 p-2 rounded bg-amber-900/50 border border-amber-700">
              <Lightbulb
                size={16}
                className="text-amber-400 mt-0.5 shrink-0"
              />
              <p className="text-sm text-amber-300">{step.tip}</p>
            </div>
          )}

          {step.durationMinutes > 0 && (
            <div className="flex items-center gap-3">
              {isTimerActive && timeLeft !== null ? (
                <div
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded font-mono text-lg font-bold",
                    timeLeft <= 10
                      ? "bg-rose-500/20 text-rose-400 animate-pulse"
                      : "bg-purple-900/50 text-purple-300",
                  )}
                >
                  <Timer size={18} />
                  {formatTime(timeLeft)}
                </div>
              ) : (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 text-purple-400 text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  <Timer size={16} />
                  Start Timer ({step.durationMinutes} min)
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 p-4 rounded bg-gray-800 border border-gray-700">
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-bold text-purple-400">
          {step.stepNumber}
        </span>
        <button
          onClick={() => onMove?.(index, "up")}
          disabled={index === 0}
          className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 text-gray-400"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={() => onMove?.(index, "down")}
          disabled={index === totalSteps - 1}
          className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 text-gray-400"
        >
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-2">
        <textarea
          value={step.instruction}
          onChange={(e) => onUpdate?.(index, "instruction", e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
          rows={3}
          placeholder="Step instruction..."
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={step.tip}
              onChange={(e) => onUpdate?.(index, "tip", e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
              placeholder="Optional tip..."
            />
          </div>
          <input
            type="number"
            min={0}
            value={step.durationMinutes}
            onChange={(e) =>
              onUpdate?.(
                index,
                "durationMinutes",
                parseInt(e.target.value) || 0,
              )
            }
            className="w-24 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-white text-sm focus:border-purple-500 focus:outline-none"
            placeholder="Min"
          />
        </div>
      </div>

      <button
        onClick={() => onRemove?.(index)}
        className="p-1 rounded hover:bg-rose-500/20 text-gray-500 hover:text-rose-400 transition-colors self-start"
      >
        <X size={16} />
      </button>
    </div>
  );
}
