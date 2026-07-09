import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return false; // Light mode default as requested
    }
    return false;
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
      className="p-2.5 rounded-full transition-all duration-300 bg-navy-100 hover:bg-navy-200 text-navy-800 dark:bg-navy-800 dark:hover:bg-navy-700 dark:text-navy-100 border border-transparent dark:border-navy-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-4 h-4 transition-transform duration-500 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-500 hover:-rotate-12" />
      )}
    </button>
  );
}
