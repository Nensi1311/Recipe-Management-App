"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">😵</div>
      <h2 className="font-display text-3xl font-bold text-stone-800 dark:text-stone-200 mb-3">
        Something went wrong
      </h2>
      <p className="text-stone-500 dark:text-stone-400 mb-8 max-w-sm mx-auto">
        {error.message || "An unexpected error occurred while loading recipes."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
