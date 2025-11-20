import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Carica le env variables
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Proxy per le funzioni Netlify in sviluppo
        '/.netlify/functions/spoonacular': {
          target: 'https://api.spoonacular.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            // Riscrivi il path dalle funzioni Netlify all'API Spoonacular diretta
            if (path.includes('/search')) {
              const query = new URLSearchParams(path.split('?')[1]).get('query')
              return `/recipes/complexSearch?query=${query}&number=10&diet=vegetarian,vegan&addRecipeInformation=true&apiKey=${env.VITE_SPOON_KEY}`
            }
            if (path.includes('/recipe')) {
              const id = new URLSearchParams(path.split('?')[1]).get('id')
              return `/recipes/${id}/information?includeNutrition=true&apiKey=${env.VITE_SPOON_KEY}`
            }
            return path
          }
        }
      }
    }
  }
})
