"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/manage";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);

    // Set the cookie
    document.cookie = `chef_token=dev-token; path=/; max-age=${60 * 60 * 24 * 7}`;

    // Use router.push then hard refresh so the server layout sees the cookie
    router.push(from);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-10 shadow-xl shadow-stone-200/50 dark:shadow-black/40">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-brand-500/30">
              🍳
            </div>
            <h1 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
              Chef Login
            </h1>
            <p className="text-stone-500 dark:text-stone-400 mt-2 text-sm">
              Sign in to manage your recipes
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter any password to demo..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 disabled:opacity-50 transition-all duration-200 shadow-md shadow-brand-500/30 text-sm"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-xs text-amber-700 dark:text-amber-400 text-center">
              💡 Demo mode — any password works
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4"></div>}>
      <LoginContent />
    </Suspense>
  );
}
