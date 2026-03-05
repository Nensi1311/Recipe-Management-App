"use client";

import React from "react";

export default function RecipeCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-12" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-12" />
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-10" />
        </div>
      </div>
    </div>
  );
}
