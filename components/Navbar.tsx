"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCooking } from "@/context/CookingContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useCooking();
  const savedCount = useSelector((s: RootState) => s.cookbook.savedIds.length);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("chef_token"));
  }, [pathname]);

  const handleLogout = () => {
    document.cookie = "chef_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Browse" },
    { href: "/cookbook", label: "Cookbook" },
    { href: "/manage", label: "Manage" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform">
            🍳
          </div>
          <span className="font-display font-bold text-xl text-stone-900 dark:text-stone-100">
            RecipeVault
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {label}
                {label === "Cookbook" && savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {savedCount > 9 ? "9+" : savedCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 border border-stone-200 dark:border-stone-700"
            >
              🔓 Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full text-sm font-medium bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 hover:bg-brand-100 transition-all duration-200 border border-brand-200 dark:border-brand-800"
            >
              🔑 Login
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-stone-200 dark:border-stone-700 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-lg"
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
