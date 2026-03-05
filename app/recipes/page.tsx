import { getRecipes } from "@/lib/db";
import { BrowseRecipesClient } from "./BrowseRecipesClient";
import { Suspense } from "react";

export default async function BrowsePage() {
  const recipes = await getRecipes();
  const publishedRecipes = recipes.filter((r) => r.published);

  return (
    <div className="fade-in">
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Browse Recipes</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Find your next favorite meal from our curated collection.
        </p>
      </header>

      <Suspense fallback={<BrowseSkeleton />}>
        <BrowseRecipesClient initialRecipes={publishedRecipes} />
      </Suspense>
    </div>
  );
}

function BrowseSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginTop: "4rem",
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="card skeleton"
          style={{ height: "350px" }}
        ></div>
      ))}
    </div>
  );
}
