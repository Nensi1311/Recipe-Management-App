import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff6b6b",
        secondary: "#4ecdc4",
        accent: "#ffe66d",
        background: "var(--bg)",
        card: "var(--card-bg)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
      },
      borderRadius: {
        DEFAULT: "12px",
      },
      boxShadow: {
        DEFAULT:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
