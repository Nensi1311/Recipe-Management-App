import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "RecipeMaster | Your Premium Cooking Companion",
  description: "Manage, scale, and master your favorite recipes with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main
            className="container"
            style={{ paddingTop: "calc(var(--header-height) + 2rem)" }}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
