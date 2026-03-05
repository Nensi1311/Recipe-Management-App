"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";

export default function LoginErrorBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("error") === "login_required") {
      setShow(true);
      // Clean up URL without reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">
            Chef access required. Please sign in to access the management area.
          </span>
        </div>
        <button
          onClick={() => setShow(false)}
          className="hover:opacity-75 transition-opacity"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
