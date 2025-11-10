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

Clona il progetto in locale con:
```
git clone https://github.com/Antonio-Laudani/veggie-recipes.git
cd veggie-recipes
```
2️⃣ Installa le dipendenze

Installa tutte le dipendenze necessarie con:
```
npm install
```
3️⃣ Configura la API key

Crea un file .env nella root del progetto e aggiungi la tua chiave Spoonacular:
```
echo "VITE_SPOON_KEY=la_tua_api_key_qui" > .env
```
4️⃣ Avvia il server di sviluppo

Esegui l’app in locale con:
```
npm run dev
```

L'applicazione sarà disponibile su 👉 http://localhost:5173

## 📜 Scripts disponibili
Comando	Descrizione
Avvia il server di sviluppo:
``` 
npm run dev
```	
Build per produzione: 
```
npm run build
```	
Anteprima della build:
```
npm run preview
```	
Controllo del codice: 
```
npm run lint	
```
## 🎨 Design e Accessibilità
### 🖋️ Font Lexend con Toggle
Il progetto utilizza il font Lexend di Google Fonts per migliorare leggibilità e accessibilità.
Implementato un toggle nella navbar per alternare tra Lexend e font di sistema.

### 🌈 Palette Colori Alto Contrasto
#### Light Mode

- **Sfondo: #F5F5DC (beige chiaro)**

- **Verde primario: #4CAF50**

- **Verde scuro: #2E7D32**

- **Testo grigio: #555555**

#### Dark Mode

- **Sfondo: #121212 (nero quasi puro)**

- **Verde brillante: #81C784**

- **Verde molto scuro: #1B5E20**

- **Testo grigio chiaro: #CCCCCC**

🎯 **Palette ottimizzata** 
Per alto contrasto e accessibilità, utile per utenti con daltonismo.

🌗 **Dark Mode Persistente**
Tema scuro mantenuto tra le sessioni via localStorage

**Toggle font e Dark/Light mode** integrato nella navbar

**Transizioni fluide e preferenze salvate automaticamente**

## 💾Gestione Stato e Preferiti
### ⚙️ Architettura Redux Toolkit
Il sistema dei preferiti utilizza Redux Toolkit. Lo store è configurato centralmente e uno slice dedicato gestisce tutte le operazioni sui preferiti.

### 🧩 Meccanica dei Preferiti
**Aggiunta**: salva nello stato globale e in localStorage

**Rimozione**: rimuove tramite ID univoco e aggiorna il localStorage

**Toggle intelligente**: aggiunge o rimuove in base alla presenza

### 🔁 Persistenza Automatica
Sincronizzazione immediata tra Redux store e localStorage, garantendo persistenza tra sessioni e refresh.

## 🔐 Sicurezza API con Netlify Functions
### ⚙️ Funzione Serverless
**JavaScript**
**Copia codice**
```
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
```
### 🌐 Chiamate dal Frontend
javascript
Copia codice
```
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
```
## ⚙️ Configurazione Environment Variables
**Copia codice**
### Su Netlify Dashboard
```
Site settings → Environment variables
VITE_SPOON_KEY = la_tua_api_key_qui
```
## 📝 Configurazione Netlify.toml
### netlify.toml
```
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  ```
## 🧪 Test in Locale
**Copia codice**
### Installa Netlify CLI globalmente
```
npm install -g netlify-cli
```
### Avvia app + funzioni localmente
```
netlify dev
```
App disponibile su 👉 http://localhost:8888

## 🌐 Deploy
Progetto su Netlify: 🔗 https://veggie-recipes.netlify.app

Processo:

Push su GitHub → build automatica

npm run build → genera dist

Deploy su Netlify (funzioni incluse)

Configura env vars

## 🐛 Risoluzione Problemi

### In caso di problemi di build
```
rm -rf node_modules && npm install
```
### Dipendenze principali:

- **@reduxjs/toolkit@1.9.5** — state management

- **react-redux@8.1.0** — React bindings

- **react-icons@5.5.0** — icons

- **@heroicons/react@2.2.0** — svg icons

- **flowbite@1.8.1** — UI components

## 👨‍💻 Autore
Antonio Laudani — Frontend Developer<br>
🔗 GitHub: https://github.com/Antonio-Laudani

<div align="center"> ⭐ Se ti piace questo progetto, lascia una **stella** sul repository! **Buon appetito e happy coding! 🍴💻** </div> ```