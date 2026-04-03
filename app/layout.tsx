import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/lib/ReduxProvider";
import { CookingProvider } from "@/context/CookingContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RecipeVault — Your Personal Cookbook",
  description: "Browse, save, and create beautiful recipes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-300">
        <ReduxProvider>
          <CookingProvider>
            <Navbar />
            <main>{children}</main>
          </CookingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
