"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useCooking } from "@/context/CookingContext";
import {
  ChefHat,
  Search,
  Book,
  Settings,
  Moon,
  Sun,
  LogIn,
  LogOut,
} from "lucide-react";

export const Nav = () => {
  const router = useRouter();
  const { savedIds } = useSelector((state: RootState) => state.cookbook);
  const { theme, toggleTheme } = useCooking();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if chef_token cookie exists
    setIsLoggedIn(document.cookie.includes("chef_token"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="sticky top-0 w-full bg-white border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 gap-4 py-4 sm:py-0">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0 sm:w-1/4"
          >
            <div className="p-2 bg-[#f06449] rounded-xl text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <ChefHat size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#f06449]">
              RecipeApp
            </span>
          </Link>

          {/* Middle: Links */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-2 flex-1">
            <Link
              href="/recipes"
              className="flex items-center gap-1.5 text-sm font-semibold text-text hover:text-[#f06449] transition-colors whitespace-nowrap"
            >
              <Search size={18} className="text-text/70" /> Browse
            </Link>
            <Link
              href="/cookbook"
              className="flex items-center gap-1.5 text-sm font-semibold text-text hover:text-[#f06449] transition-colors relative whitespace-nowrap"
            >
              <Book size={18} className="text-text/70" /> Cookbook
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-[#f06449] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {savedIds.length}
                </span>
              )}
            </Link>
            <Link
              href="/manage"
              className="flex items-center gap-1.5 text-sm font-semibold text-text hover:text-[#f06449] transition-colors whitespace-nowrap"
            >
              <Settings size={18} className="text-text/70" /> Manage
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end gap-3 shrink-0 sm:w-1/4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 transition-all"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-[#f06449] transition-colors"
              >
                <LogIn size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
