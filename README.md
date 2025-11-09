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
1️⃣ Clona il repository
git clone https://github.com/Antonio-Laudani/veggie-recipes.git
cd veggie-recipes

2️⃣ Installa le dipendenze
npm install

3️⃣ Configura la API key
echo "VITE_SPOON_KEY=la_tua_api_key_qui" > .env

4️⃣ Avvia il server di sviluppo
npm run dev


L'applicazione sarà disponibile su 👉 http://localhost:5173

📜 Scripts disponibili
Comando	Descrizione
npm run dev	Avvia il server di sviluppo
npm run build	Build per produzione
npm run preview	Anteprima della build
npm run lint	Controllo del codice
🎨 Design e Accessibilità
🖋️ Font Lexend con Toggle

Il progetto utilizza il font Lexend di Google Fonts per migliorare leggibilità e accessibilità.
Implementato un toggle nella navbar per alternare tra Lexend e font di sistema.

🌈 Palette Colori Alto Contrasto

Light Mode

Sfondo: #F5F5DC (beige chiaro)

Verde primario: #4CAF50

Verde scuro: #2E7D32

Testo grigio: #555555

Dark Mode

Sfondo: #121212 (nero quasi puro)

Verde brillante: #81C784

Verde molto scuro: #1B5E20

Testo grigio chiaro: #CCCCCC

🎯 La palette è ottimizzata per alto contrasto e massima accessibilità visiva, utile anche per utenti con daltonismo.

🌗 Dark Mode Persistente

Il tema scuro viene mantenuto tra le sessioni grazie a localStorage.
Toggle accessibile dalla navbar, con transizioni fluide e preferenze utente salvate automaticamente.

💾 Gestione Stato e Preferiti
⚙️ Architettura Redux Toolkit

Il sistema dei preferiti utilizza Redux Toolkit per una gestione dello stato efficiente e prevedibile.
Lo store è configurato centralmente e lo slice dedicato ai preferiti gestisce tutte le operazioni relative alle ricette salvate dall’utente.

🧩 Meccanica dei Preferiti

Aggiunta preferiti: la ricetta viene aggiunta allo stato globale e salvata nel localStorage.

Rimozione preferiti: avviene tramite ID univoco, aggiornando sia lo stato che la memoria persistente.

Toggle intelligente: una singola azione controlla se aggiungere o rimuovere una ricetta dai preferiti.

🔁 Persistenza Automatica

Le operazioni sui preferiti vengono sincronizzate con il localStorage, garantendo la conservazione dei dati tra le sessioni e il ripristino automatico al riavvio dell’app.

🔐 Sicurezza API con Netlify Functions
⚙️ Funzione Serverless
// netlify/functions/spoonacular.js
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
      return {
        statusCode: 200,
        body: JSON.stringify(data.results),
      };
    }

    // Rotta per dettaglio
    if (path.includes("recipe")) {
      const id = queryStringParameters.id;
      const res = await fetch(
        `${BASE_URL}/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
      );
      const data = await res.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid route" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

🌐 Chiamate dal Frontend
// Per ricerca ricette
const fetchRecipes = async (query) => {
  const res = await fetch(`/.netlify/functions/spoonacular?query=${query}`);
  return await res.json();
};

// Per dettaglio ricetta
const fetchRecipeDetails = async (id) => {
  const res = await fetch(`/.netlify/functions/spoonacular?id=${id}`);
  return await res.json();
};

⚙️ Configurazione Environment Variables

Su Netlify Dashboard:

Site settings → Environment variables
VITE_SPOON_KEY = la_tua_api_key_qui

📝 Configurazione Netlify
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200


Build: comando e directory di output

Functions: directory delle funzioni serverless

Redirects: gestione routing SPA

🧪 Test in Locale
# Installa Netlify CLI globalmente
npm install -g netlify-cli

# Testa l'applicazione con funzioni serverless
netlify dev


App disponibile su 👉 http://localhost:8888

🌐 Deploy

Progetto distribuito su Netlify:
🔗 https://veggie-recipes.netlify.app

Processo di deploy:

Push su GitHub → build automatica

npm run build → generazione cartella dist

Deploy automatico su Netlify

Setup delle Netlify Functions

Configurazione delle variabili ambiente

🐛 Risoluzione Problemi
📦 Dipendenze installate

@reduxjs/toolkit@1.9.5 → State management

react-redux@8.1.0 → React bindings

react-icons@5.5.0 → Icon library

@heroicons/react@2.2.0 → SVG icons

flowbite@1.8.1 → UI components

❗ Problemi comuni

API Key non valida → verifica su Spoonacular Dashboard

Funzioni non funzionanti → controlla le variabili ambiente su Netlify

Build fallita →

rm -rf node_modules && npm install

👨‍💻 Autore

Antonio Laudani — Frontend Developer
🔗 GitHub: @Antonio-Laudani

💻 Live Demo

<div align="center">

⭐ Se ti piace questo progetto, lascia una stella sul repository!

Buon appetito e happy coding! 🍴💻

</div>