import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Inizializza darkMode da localStorage
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  // Inizializza fontLexend da localStorage
  const [fontLexend, setFontLexend] = useState(() => {
    try {
      return localStorage.getItem('fontLexend') === 'true';
    } catch {
      return false;
    }
  });

  // UNICO useEffect che gestisce TUTTE le classi sul documentElement
  useEffect(() => {
    const root = document.documentElement;

    // Gestione dark mode
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Gestione font - SOLO sul documentElement (elimina duplicazione)
    if (fontLexend) {
      root.classList.add('font-lexend');
      root.classList.remove('font-classico');
    } else {
      root.classList.add('font-classico');
      root.classList.remove('font-lexend');
    }

    // Persistenza
    try {
      localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
      localStorage.setItem('fontLexend', fontLexend ? 'true' : 'false');
    } catch (error) {
      console.error('Errore localStorage:', error);
    }
  }, [darkMode, fontLexend]); // Tutte le dipendenze in un unico effect

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleFont = () => setFontLexend(prev => !prev);

  const value = {
    darkMode,
    toggleDarkMode,
    fontLexend,
    toggleFont
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};