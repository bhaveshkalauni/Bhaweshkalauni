import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return true; // Default to sleek dark mode for strong editorial visual impact
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => setDarkMode(!darkMode)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase border border-neutral-300 dark:border-neutral-800 rounded text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <>
          <Sun className="w-3 h-3 text-neutral-400" />
          <span>LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="w-3 h-3 text-neutral-600" />
          <span>DARK</span>
        </>
      )}
    </button>
  );
}

