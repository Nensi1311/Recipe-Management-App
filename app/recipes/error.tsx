"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function RecipesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-6">
          <AlertTriangle size={36} className="text-rose-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-400 mb-6 max-w-md">
          {error.message ||
            "An unexpected error occurred while loading recipes."}
        </p>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}
