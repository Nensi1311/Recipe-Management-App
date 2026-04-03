# RecipeVault — Recipe Management App

A full-stack recipe management application built with Next.js 14+ App Router, TypeScript, Redux Toolkit, Context API, and Tailwind CSS.

## Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict, no `any`)
- **State**: Redux Toolkit (recipes + cookbook slices)
- **Context**: CookingContext (serving scaler, unit conversion, theme)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Features
- Browse published recipes with filters (category, dietary tags, difficulty, search, max cook time)
- Recipe detail page with live serving scaler, unit toggle (metric/imperial), per-step countdown timers
- Save recipes to personal cookbook (localStorage persisted)
- Create and edit recipes with dynamic ingredient/step editors including drag-to-reorder
- Star rating system with running average
- Dark/light theme toggle
- Middleware protecting `/manage` routes (requires `chef_token` cookie)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Accessing /manage

The `/manage` routes are protected by middleware that checks for a `chef_token` cookie. To access manage pages in development, set this cookie in your browser:

```js
document.cookie = "chef_token=dev-token; path=/";
```

## Folder Structure

```
app/               # Next.js App Router pages
  api/             # API routes
  recipes/         # Browse + detail pages
  cookbook/        # Saved recipes
  manage/          # Create/edit/manage pages
components/        # Reusable UI components
context/           # CookingContext
hooks/             # Custom hooks
lib/               # Data store + utilities
store/             # Redux slices
types/             # TypeScript types
```

## API Routes

- `GET /api/recipes` — list with filters
- `POST /api/recipes` — create recipe
- `GET/PUT/DELETE /api/recipes/[id]` — CRUD
- `POST /api/recipes/[id]/rate` — submit rating
