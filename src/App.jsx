import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/index";
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import useDarkMode from "./hooks/useDarkMode";
import useFont from './hooks/useFont';
import './index.css';
import 'flowbite';

function App() {

  // Usa l'hook pulito
  const { darkMode, toggleDarkMode } = useDarkMode();
   const { fontLexend, toggleFont } = useFont();
  // SOLO per il font: usa classList.toggle per NON sovrascrivere altre classi
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('font-lexend', fontLexend);
    root.classList.toggle('font-classico', !fontLexend);
  }, [fontLexend]);
   // 🩵 Evita lo "sfarfallio" al cambio di pagina
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("transition-none");
    const timeout = setTimeout(() => {
      html.classList.remove("transition-none");
    }, 50);
    return () => clearTimeout(timeout);
  }, []);


  return (
    <Provider store={store}>

    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300">
        <MyNavbar 
          fontLexend={fontLexend} 
          toggleFont={toggleFont} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer
          fontLexend={fontLexend}
          toggleFont={toggleFont}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
