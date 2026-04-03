"use client";

import { useEffect, useRef, useState } from "react";
import { RecipeStep } from "@/types/recipe";

interface StepCardProps {
  step: RecipeStep;
  index: number;
  editable?: boolean;
  onChange?: (index: number, field: keyof RecipeStep, value: string | number) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isFirst?: boolean;
  isLast?: boolean;
  activeTimerIndex?: number | null;
  onTimerStart?: (index: number) => void;
  className?: string;
}

export function StepCard({
  step,
  index,
  editable = false,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  activeTimerIndex,
  onTimerStart,
  className = "",
}: StepCardProps) {
  const [tipOpen, setTipOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isActiveTimer = activeTimerIndex === index;

  useEffect(() => {
    if (!isActiveTimer && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimeLeft(null);
      setTimerDone(false);
    }
  }, [isActiveTimer]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (!step.durationMinutes) return;
    onTimerStart?.(index);
    setTimerDone(false);
    const totalSeconds = step.durationMinutes * 60;
    setTimeLeft(totalSeconds);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimerDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (editable) {
    return (
      <div className={`p-4 bg-stone-50 dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
            {step.stepNumber}
          </div>
          <div className="flex-1 space-y-2">
            <textarea
              value={step.instruction}
              onChange={(e) => onChange?.(index, "instruction", e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
              rows={3}
              placeholder="Describe this step..."
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={step.durationMinutes ?? ""}
                min={0}
                onChange={(e) => onChange?.(index, "durationMinutes", parseInt(e.target.value) || 0)}
                className="w-28 px-2 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="Min (opt)"
              />
              <input
                type="text"
                value={step.tip ?? ""}
                onChange={(e) => onChange?.(index, "tip", e.target.value)}
                className="flex-1 px-2 py-1.5 text-sm rounded-lg border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400"
                placeholder="Pro tip (optional)"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => !isFirst && onMoveUp?.(index)}
              disabled={isFirst}
              className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-700 disabled:opacity-30 hover:bg-stone-200 flex items-center justify-center text-xs"
            >▲</button>
            <button
              onClick={() => !isLast && onMoveDown?.(index)}
              disabled={isLast}
              className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-700 disabled:opacity-30 hover:bg-stone-200 flex items-center justify-center text-xs"
            >▼</button>
            <button
              onClick={() => onRemove?.(index)}
              className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-500 hover:bg-red-200 flex items-center justify-center text-sm"
            >×</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-brand-500/30">
          {step.stepNumber}
        </div>
        {!isLast && <div className="w-0.5 flex-1 min-h-4 bg-stone-200 dark:bg-stone-700 mt-2" />}
      </div>

      <div className="flex-1 pb-8">
        <p className="text-stone-800 dark:text-stone-200 leading-relaxed">{step.instruction}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {step.durationMinutes && (
            <div className="flex items-center gap-2">
              {(!isActiveTimer || timeLeft === null) && !timerDone && (
                <button
                  onClick={startTimer}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-700 hover:bg-brand-100 transition-colors"
                >
                  ▶ Start Timer ({step.durationMinutes} min)
                </button>
              )}
              {isActiveTimer && timeLeft !== null && !timerDone && (
                <span className={`text-sm font-mono font-bold px-3 py-1.5 rounded-full border ${
                  timeLeft <= 10
                    ? "bg-red-50 text-red-600 border-red-300 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700 animate-pulse"
                    : "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700"
                }`}>
                  ⏱ {formatTime(timeLeft)}
                </span>
              )}
              {timerDone && isActiveTimer && (
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700">
                  🔔 Time&apos;s Up!
                </span>
              )}
            </div>
          )}

          {step.tip && (
            <button
              onClick={() => setTipOpen(!tipOpen)}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors"
            >
              💡 {tipOpen ? "Hide tip" : "Show tip"}
            </button>
          )}
        </div>

        {step.tip && tipOpen && (
          <div className="mt-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-sm text-amber-800 dark:text-amber-300">
            💡 {step.tip}
          </div>
        )}
      </div>
    </div>
  );
}
