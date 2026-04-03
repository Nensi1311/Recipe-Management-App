import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const chefToken = cookieStore.get("chef_token");

  if (!chefToken) {
    redirect("/login?from=/manage");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-56 flex-shrink-0 hidden md:block">
          <nav className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 sticky top-24">
            <h2 className="font-display font-bold text-stone-700 dark:text-stone-300 text-sm uppercase tracking-wide mb-4 px-2">
              Manage
            </h2>
            <div className="space-y-1">
              <Link
                href="/manage"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 transition-colors"
              >
                📋 My Recipes
              </Link>
              <Link
                href="/manage/create"
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-brand-600 transition-colors"
              >
                ✨ Create Recipe
              </Link>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
