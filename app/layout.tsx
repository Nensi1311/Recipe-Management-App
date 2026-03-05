import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";
import { CookingProvider } from "@/context/CookingContext";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Recipe Management App",
  description: "Discover, create and manage your favorite recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-950 text-white min-h-screen`}
      >
        <StoreProvider>
          <CookingProvider>
            <Navigation />
            <main className="pt-16">{children}</main>
          </CookingProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
