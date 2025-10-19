import { useState, useEffect } from "react";

export default function useFont() {
  const [fontLexend, setFontLexend] = useState(() => {
    try {
      return localStorage.getItem("fontLexend") === "true";
    } catch {
      return false;
    }
  });

  const toggleFont = () => {
    setFontLexend(prev => {
      try {
        localStorage.setItem("fontLexend", !prev);
      } catch {}
      return !prev;
    });
  };

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("font-lexend", fontLexend);
    body.classList.toggle("font-classico", !fontLexend);
  }, [fontLexend]);

  return { fontLexend, toggleFont };
}
