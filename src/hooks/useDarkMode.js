import { useState, useEffect } from "react";

export default function useDarkMode() {
  // Legge sync dal localStorage al primo render — evita il flash e desync
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });

  // Sincronizza HTML class e localStorage ogni volta che darkMode cambia
  useEffect(() => {
    const root = document.documentElement; // <html>
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("darkMode", darkMode ? "true" : "false");
    } catch {}
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return { darkMode, toggleDarkMode };
}

