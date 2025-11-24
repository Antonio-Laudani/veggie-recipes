// src/API/apiHelper.js

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

// Mappa gli status HTTP a messaggi user-friendly
const ERROR_MESSAGES = {
  400: 'Richiesta non valida',
  404: 'Ricetta non trovata',
  408: 'Timeout della richiesta',
  429: 'Troppe richieste, riprova più tardi',
  500: 'Errore del server',
  503: 'Servizio non disponibile',
  default: 'Errore di connessione'
};

export const handleApiResponse = async (response) => {
  if (response.ok) {
    return await response.json();
  }

  const message = ERROR_MESSAGES[response.status] || ERROR_MESSAGES.default;
  throw new ApiError(message, response.status);
};

export const fetchWithTimeout = async (url, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await handleApiResponse(response);
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new ApiError(ERROR_MESSAGES[408], 408);
    }
    
    if (error instanceof ApiError) {
      throw error; // Già gestito
    }
    
    // Errori di rete generici
    throw new ApiError(ERROR_MESSAGES.default, 0);
  }
};