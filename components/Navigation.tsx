"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setSavedIds } from "@/store/cookbookSlice";
import { hydrateRecipes, fetchRecipes } from "@/store/recipeSlice";
import { useCooking } from "@/context/CookingContext";
import { ChefHat, BookOpen, Bookmark, Settings, Sun, Moon } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { href: "/recipes", label: "Browse", icon: BookOpen },
  { href: "/cookbook", label: "Cookbook", icon: Bookmark },
  { href: "/manage", label: "Manage", icon: Settings },
];

export default function Navigation() {
  const pathname = usePathname();
  const { recipes, status } = useSelector((state: RootState) => state.recipes);
  const savedIds = useSelector((state: RootState) => state.cookbook.savedIds);
  const dispatch = useDispatch<AppDispatch>();

  const savedCount =
    status === "succeeded"
      ? savedIds.filter((id) => recipes.some((r) => r.id === id)).length
      : savedIds.filter(Boolean).length;

  const { theme, toggleTheme } = useCooking();

  // Hydrate recipes from localStorage and fetch seed data on mount
  useEffect(() => {
    dispatch(hydrateRecipes());

    // Only fetch if not already loading/succeeded
    if (status === "idle") {
      dispatch(fetchRecipes());
    }

    const saved = localStorage.getItem("cookbook-savedIds");
    if (saved) {
      try {
        const ids = JSON.parse(saved) as string[];
        dispatch(setSavedIds(ids));
      } catch {
        // ignore
      }
    }
  }, [dispatch, status]);

  // Persist saved IDs to localStorage
  useEffect(() => {
    localStorage.setItem("cookbook-savedIds", JSON.stringify(savedIds));
  }, [savedIds]);

  return (
    <nav className="border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-md bg-purple-600">
              <ChefHat size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Recipe Management App
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
                    isActive
                      ? "bg-gray-800 text-purple-400"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                  )}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                  {label === "Cookbook" && savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold">
                      {savedCount}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
