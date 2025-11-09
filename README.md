# 🥗 Veggie Recipes

Applicazione web realizzata in **React** per esplorare e visualizzare ricette vegetariane, con interfaccia moderna, supporto dark mode, font **Lexend** e design ad **alto contrasto per daltonici**.  
Il progetto è hostato su **Netlify**, con gestione sicura della chiave API tramite **funzioni serverless**.

---

## 🚀 Funzionalità principali

- 🔍 **Ricerca ricette** tramite API Spoonacular con filtri avanzati
- 📄 **Dettaglio ricette** con informazioni complete, ingredienti e nutrizione
- 💚 **Sistema di preferiti** gestito tramite Redux Toolkit, persistente tramite `localStorage`
- 🌓 **Dark Mode persistente** con salvataggio automatico delle preferenze
- 🖍️ **Toggle font** tra Lexend e font di sistema per migliore accessibilità
- 📱 **Design responsive** basato su Tailwind CSS e Flowbite
- ⚙️ **Integrazione serverless** Netlify Functions per proteggere la chiave API
- 🔄 **Routing client-side** con React Router DOM

---

## 🛠️ Tecnologie principali

| Categoria | Strumenti |
|-----------|-----------|
| **Frontend** | React 18, React Router DOM, Redux Toolkit |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, Flowbite Components |
| **Icons** | Heroicons, React Icons |
| **State Management** | Redux Toolkit, React Context |
| **API** | Spoonacular Food API |
| **Hosting & Functions** | Netlify |
| **Font** | Lexend (Google Fonts) |

---

## ⚙️ Installazione e avvio locale

### Prerequisiti
- **Node.js** 16.0 o superiore  
- **Account Spoonacular** per l'API key ([registrati qui](https://spoonacular.com/food-api))

---

## 🛠️ Setup sviluppo

### 1️⃣ Clona il repository  
```bash
git clone https://github.com/Antonio-Laudani/veggie-recipes.git
cd veggie-recipes
2️⃣ Installa le dipendenze
bash
Copia codice
npm install
3️⃣ Configura la API key
Crea il file .env nella root del progetto:

bash
Copia codice
echo "VITE_SPOON_KEY=la_tua_api_key_qui" > .env
4️⃣ Avvia il server di sviluppo
bash
Copia codice
npm run dev
L’applicazione sarà disponibile su 👉 http://localhost:5173

📜 Scripts disponibili
bash
Copia codice
# Sviluppo
npm run dev

# Build produzione
npm run build

# Anteprima build
npm run preview

# Controllo codice
npm run lint
🎨 Design e Accessibilità
🖋️ Font Lexend con Toggle
Il progetto utilizza il font Lexend di Google Fonts per migliorare leggibilità e accessibilità.
È presente un toggle nella navbar per alternare tra Lexend e il font di sistema.

🌈 Palette Colori ad Alto Contrasto
Light Mode

Elemento	Colore
Sfondo	#F5F5DC (beige chiaro)
Verde primario	#4CAF50
Verde scuro	#2E7D32
Testo	#555555

Dark Mode

Elemento	Colore
Sfondo	#121212 (nero quasi puro)
Verde brillante	#81C784
Verde molto scuro	#1B5E20
Testo	#CCCCCC

🎯 La palette è ottimizzata per garantire alto contrasto e accessibilità visiva, anche per utenti con daltonismo.

🌗 Dark Mode Persistente
Tema scuro mantenuto tra le sessioni via localStorage

Toggle accessibile nella navbar

Transizioni fluide tra temi

Preferenze utente salvate automaticamente

💾 Gestione Stato e Preferiti
⚙️ Architettura Redux Toolkit
Il sistema dei preferiti utilizza Redux Toolkit per gestire lo stato in modo efficiente e prevedibile.
Lo store è configurato centralmente e include uno slice dedicato ai preferiti.

🧩 Meccanica dei Preferiti
Aggiunta preferiti → la ricetta viene salvata nello stato globale e in localStorage

Rimozione preferiti → eliminazione tramite ID univoco

Toggle intelligente → una singola azione verifica se aggiungere o rimuovere

🔁 Persistenza Automatica
Le modifiche ai preferiti vengono sincronizzate con localStorage, così da:

mantenere i dati tra i refresh

ripristinare lo stato al riavvio dell’app

aggiornare l’interfaccia in tempo reale

🔐 Sicurezza API con Netlify Functions
📦 Funzione Serverless
File: netlify/functions/spoonacular.js

javascript
Copia codice
const API_KEY = process.env.VITE_SPOON_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

export async function handler(event) {
  const { path, queryStringParameters } = event;

  try {
    // Rotta per ricerca
    if (path.includes("search")) {
      const query = queryStringParameters.query;
      const res = await fetch(
        `${BASE_URL}/complexSearch?query=${query}&number=10&diet=vegetarian,vegan&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return { statusCode: 200, body: JSON.stringify(data.results) };
    }

    // Rotta per dettaglio
    if (path.includes("recipe")) {
      const id = queryStringParameters.id;
      const res = await fetch(
        `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return { statusCode: 200, body: JSON.stringify(data) };
    }

    return { statusCode: 400, body: JSON.stringify({ message: "Invalid route" }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
🌐 Chiamate dal Frontend
javascript
Copia codice
// Ricerca ricette
const fetchRecipes = async (query) => {
  const res = await fetch(`/.netlify/functions/spoonacular?query=${query}`);
  return await res.json();
};

// Dettaglio ricetta
const fetchRecipeDetails = async (id) => {
  const res = await fetch(`/.netlify/functions/spoonacular?id=${id}`);
  return await res.json();
};
⚙️ Configurazione Environment Variables
Su Netlify Dashboard:

bash
Copia codice
Site settings → Environment variables
VITE_SPOON_KEY = la_tua_api_key_qui
📝 Configurazione Netlify
File: netlify.toml

toml
Copia codice
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
Build: comando e directory di output

Functions: directory funzioni serverless

Redirects: gestione SPA routing

🧪 Test in Locale
bash
Copia codice
# Installa Netlify CLI
npm install -g netlify-cli

# Avvia app e funzioni serverless
netlify dev
App disponibile su 👉 http://localhost:8888

🌐 Deploy
Progetto distribuito su Netlify:
🔗 https://veggie-recipes.netlify.app

Processo di Deploy
Push su GitHub → build automatica

npm run build → generazione /dist

Netlify Functions → configurate automaticamente

Environment variables impostate

🐛 Risoluzione Problemi
📦 Dipendenze principali
bash
Copia codice
@reduxjs/toolkit@1.9.5    ✓ State management
react-redux@8.1.0         ✓ React bindings
react-icons@5.5.0         ✓ Icon library
@heroicons/react@2.2.0    ✓ SVG icons
flowbite@1.8.1            ✓ UI components
❗ Problemi comuni
API Key non valida → verifica su Spoonacular Dashboard

Funzioni serverless non attive → controlla le variabili ambiente su Netlify

Build fallita →

bash
Copia codice
rm -rf node_modules && npm install
👨‍💻 Autore
Antonio Laudani — Frontend Developer
🌐 GitHub: @Antonio-Laudani
💻 Live Demo

<div align="center">
⭐ Se ti piace questo progetto, lascia una stella sul repository!

Buon appetito e happy coding! 🍴💻

</div> ```