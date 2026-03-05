"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChefHat, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(
    searchParams.get("error") === "login_required"
      ? "Please sign in to access that page."
      : "",
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        if (mode === "signup") {
          // after signup, switch to sign-in
          setMode("signin");
          setError("");
          setPassword("");
          setConfirmPassword("");
          alert("Account created! Please sign in.");
        } else {
          router.push("/manage");
        }
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #fce4ec 50%, #f3e5f5 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2.5 mb-8"
        >
          <div
            className="p-2 rounded-xl text-white"
            style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}
          >
            <ChefHat size={22} />
          </div>
          <span className="text-xl font-bold text-gray-900">RecipeApp</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => switchMode()}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                mode === "signin"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              type="button"
            >
              Sign In
            </button>
            <button
              onClick={() => switchMode()}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                mode === "signup"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {mode === "signin" ? "Welcome back!" : "Create account"}
          </h1>
          <p className="text-sm text-gray-500 mb-5">
            {mode === "signin"
              ? "Sign in to manage your recipes"
              : "Sign up to start cooking"}
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 transition-all"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-semibold transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(to right, #f97316, #ec4899)",
              }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Demo hint (only for signin) */}
          {mode === "signin" && (
            <div className="mt-4 py-2 px-3 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-[11px] text-amber-700 text-center">
                Demo: <strong>chef</strong> / <strong>letmecook</strong>
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-5">
          <Link href="/" className="text-orange-500 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
