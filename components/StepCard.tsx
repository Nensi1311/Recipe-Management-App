"use client";

import { useState, useEffect, useRef } from "react";
import { RecipeStep } from "@/types/recipe";
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Trash2,
  Info,
} from "lucide-react";

interface StepCardProps {
  step: RecipeStep;
  index: number;
  editable?: boolean;
  onChange?: (
    index: number,
    field: keyof RecipeStep,
    value: string | number,
  ) => void;
  onRemove?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  isFirst?: boolean;
  isLast?: boolean;
  className?: string;
}

export const StepCard = ({
  step,
  index,
  editable,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  className,
}: StepCardProps) => {
  const [timeLeft, setTimeLeft] = useState(
    step.durationMinutes ? step.durationMinutes * 60 : 0,
  );
  const [isActive, setIsActive] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isTimeUp = step.durationMinutes && timeLeft === 0;
  const isWarning = timeLeft < 10 && timeLeft > 0;

  if (editable) {
    return (
      <div
        className={`bg-card rounded-lg border border-border p-4 mb-4 animate-fade-in ${className || ""}`}
      >
        <div className="flex justify-between mb-4">
          <span className="font-bold text-sm uppercase tracking-wider text-text-muted">
            Step {step.stepNumber}
          </span>
          <div className="flex gap-2">
            {!isFirst && (
              <button
                onClick={() => onMoveUp?.(index)}
                className="p-1 hover:bg-background rounded transition-colors"
                title="Move Up"
              >
                <ChevronUp size={18} />
              </button>
            )}
            {!isLast && (
              <button
                onClick={() => onMoveDown?.(index)}
                className="p-1 hover:bg-background rounded transition-colors"
                title="Move Down"
              >
                <ChevronDown size={18} />
              </button>
            )}
            <button
              onClick={() => onRemove?.(index)}
              className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
              title="Remove Step"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <textarea
          value={step.instruction}
          onChange={(e) => onChange?.(index, "instruction", e.target.value)}
          placeholder="What should be done in this step?"
          className="w-full min-h-[100px] p-3 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm mb-3 resize-none"
        />
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[10px] font-bold uppercase tracking-wide text-text-muted block mb-1">
              Duration (min)
            </label>
            <input
              type="number"
              value={step.durationMinutes || ""}
              onChange={(e) =>
                onChange?.(index, "durationMinutes", parseInt(e.target.value))
              }
              className="w-full p-2 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
            />
          </div>
          <div className="flex-[2]">
            <label className="text-[10px] font-bold uppercase tracking-wide text-text-muted block mb-1">
              Cooking Tip (optional)
            </label>
            <input
              type="text"
              value={step.tip || ""}
              onChange={(e) => onChange?.(index, "tip", e.target.value)}
              className="w-full p-2 rounded border border-border bg-background focus:ring-2 focus:ring-primary outline-none text-sm"
              placeholder="e.g. Be careful not to overcook"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-4 mb-8 group animate-fade-in ${className || ""}`}>
      <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow-sm group-hover:scale-110 transition-transform">
        {step.stepNumber}
      </div>
      <div className="flex-1">
        <p className="text-lg mb-3 text-text leading-relaxed">
          {step.instruction}
        </p>

        {step.tip && (
          <div className="mb-4">
            <button
              onClick={() => setShowTip(!showTip)}
              className="flex items-center gap-1.5 text-secondary font-bold text-sm bg-none hover:underline focus:outline-none"
            >
              <Info size={16} /> {showTip ? "Hide Tip" : "Show Tip"}
            </button>
            {showTip && (
              <div className="mt-2 p-3 border-l-4 border-secondary bg-secondary/5 rounded-r italic text-sm text-text-muted transition-all animate-fade-in">
                {step.tip}
              </div>
            )}
          </div>
        )}

        {step.durationMinutes && step.durationMinutes > 0 && (
          <div className="flex items-center gap-4 bg-background p-3 rounded-lg border border-border shadow-sm w-fit">
            <div
              className={`flex items-center gap-2 text-xl font-black w-24 tabular-nums ${isWarning ? "text-red-500 animate-pulse" : "text-text"}`}
            >
              <Clock
                size={20}
                className={isActive ? "animate-spin-slow" : ""}
              />
              {isTimeUp ? "DONE" : formatTime(timeLeft)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsActive(!isActive)}
                className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
              >
                {isActive ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button
                onClick={() => {
                  setIsActive(false);
                  setTimeLeft(step.durationMinutes! * 60);
                }}
                className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            {isTimeUp && (
              <span className="font-black text-red-500 text-sm uppercase tracking-widest animate-bounce">
                Time's Up!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
