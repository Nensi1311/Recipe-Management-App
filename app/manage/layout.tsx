import React from "react";
import Link from "next/link";
import { Settings, Plus, ChefHat } from "lucide-react";

export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24 p-4 rounded bg-gray-800 border border-gray-700 space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 mb-2">
              <ChefHat size={20} className="text-purple-400" />
              <span className="font-bold text-white">Chef Dashboard</span>
            </div>
            <Link
              href="/manage"
              className="flex items-center gap-2 px-3 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Settings size={16} />
              My Recipes
            </Link>
            <Link
              href="/manage/create"
              className="flex items-center gap-2 px-3 py-2 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Create Recipe
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
