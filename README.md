# RecipeMaster - Premium Recipe Management App

RecipeMaster is a high-end application for managing, scaling, and mastering recipes. Built with Next.js 15, TypeScript (Strict), Redux Toolkit, and Context API.

## 🚀 How to Run Locally

1.  **Install Dependencies**:

    ```bash
    npm install
    ```

2.  **Run Development Server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

3.  **Login as Chef**:
    To access the Management area (`/manage`), click the **"Login as Chef"** button in the navigation bar. This sets the required `chef_token` cookie for the middleware.

## 📂 Folder Structure

```text
/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes (CRUD & Ratings)
│   ├── cookbook/           # User's saved recipes
│   ├── manage/             # Management Dashboard (Protected)
│   ├── recipes/            # Browse & Detail pages
│   ├── layout.tsx          # Root layout with Providers
│   └── globals.css         # Core Design System (Vanilla CSS)
├── components/             # Reusable UI Components
├── context/                # Context API (CookingContext)
├── hooks/                  # Custom Hooks (Scaler, Form, Filters)
├── lib/                    # Shared Utilities & DB (File-based)
├── store/                  # Redux Toolkit (Slices & Store)
├── types/                  # Strict TypeScript Type Definitions
├── data/                   # JSON Storage for Recipe Data
└── middleware.ts           # Route Protection & Logging
```

## ✨ Key Features

- **Interactive Cook Mode**: Real-time ingredient scaling and unit conversion (Metric/Imperial).
- **Step Timers**: Built-in countdown timers for each recipe step with visual alerts.
- **Smart Filters**: Complex filtering by category, difficulty, dietary tags, and cook time.
- **Personal Cookbook**: Save and manage your favorite recipes with localStorage persistence.
- **Management Suite**: Full CRUD interface with dynamic ingredient and step editors.
- **Premium Aesthetics**: Modern, responsive design with dark mode support.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **State Management**: Redux Toolkit & Context API
- **Styling**: Vanilla CSS (Custom Variable System)
- **Icons**: Lucide React

```

```
