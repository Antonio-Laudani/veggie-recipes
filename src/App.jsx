import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/index";
import { AppProvider } from './contexts/AppContext';
import MyNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import './index.css';

function App() {
  // Rimuovi gli useEffects duplicati - ora sono nel Context

  // Solo effetto per transizioni (rimane)
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
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col transition-colors duration-300">
            <MyNavbar /> {/* Niente props! */}
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer /> {/* Niente props! */}
          </div>
        </Router>
      </AppProvider>
    </Provider>
  );
}

export default App;