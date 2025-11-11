import { useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import { initFlowbite } from "flowbite";

const MyNavbar = ({ darkMode, toggleDarkMode, fontLexend, toggleFont }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;


useEffect(() => {
  // Inizializza Flowbite
  initFlowbite();

  const toggleBtn = document.querySelector("[data-collapse-toggle='navbar-default']");
  const collapseMenu = document.getElementById("navbar-default");
  if (!toggleBtn || !collapseMenu) return;

  // Chiude al click sui link (solo mobile)
  const links = collapseMenu.querySelectorAll("a");
  const handleLinkClick = () => {
    if (window.innerWidth < 768 && !collapseMenu.classList.contains("hidden")) {
      toggleBtn.click();
    }
  };
  
  links.forEach(link => link.addEventListener("click", handleLinkClick));

  // Chiude al click fuori - VERSIONE MIGLIORATA
  const handleOutsideClick = (e) => {
    // Solo per mobile
    if (window.innerWidth >= 768) return;
    
    const isToggleButton = e.target === toggleBtn || toggleBtn.contains(e.target);
    const isMenu = collapseMenu.contains(e.target);
    
  
    if (!isToggleButton && !isMenu && !collapseMenu.classList.contains("hidden")) {
      toggleBtn.click();
    }
  };

  // Aggiungi l'event listener con un piccolo delay per evitare conflitti iniziali
  const timer = setTimeout(() => {
    document.addEventListener("click", handleOutsideClick);
  }, 50);

  return () => {
    links.forEach(link => link.removeEventListener("click", handleLinkClick));
    document.removeEventListener("click", handleOutsideClick);
    clearTimeout(timer);
  };
}, [location.pathname]);




  const menuItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Favorites", href: "/favorites" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-light-background dark:bg-dark-background font-sans border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/images/logo.svg" className="h-8" alt="Veggie Recipes Logo" />
        </a>

        {/* Pulsanti dark mode + font */}
        <div className="flex items-center space-x-2 md:order-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full border border-gray-300 bg-light-background hover:bg-gray-100 dark:bg-black dark:hover:bg-dark-gray transition-colors duration-200 focus:outline-none"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-900 dark:text-white" />
            )}
          </button>

          <button
            onClick={toggleFont}
            className="px-3 py-1 rounded border border-gray-300 bg-light-green dark:text-black dark:bg-bright-green dark:border-gray-600 text-sm focus:outline-none"
          >
            {fontLexend ? "Lexend" : "Classic"}
          </button>

          {/* Mobile toggle Flowbite */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg 
             md:hidden 
            text-black bg-light-background hover:bg-light-green focus:outline-none focus:ring-2 focus:ring-light-green 
             dark:bg-dark-background dark:hover:bg-bright-green dark:focus:ring-bright-green transition-colors duration-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium bg-light-background md:flex-row md:space-x-8 md:mt-0 dark:bg-dark-background md:dark:bg-dark-background">
            {menuItems.map((item) => (
              <li key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`block py-2 px-3 rounded-sm transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-light-green dark:text-bright-green font-semibold"
                      : "text-light-gray dark:text-dark-gray hover:text-light-green dark:hover:text-bright-green"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-light-green dark:bg-bright-green transition-all duration-300 ${
                      isActive(item.href) ? "w-full" : "w-0"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;

