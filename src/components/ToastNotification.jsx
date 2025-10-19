// src/components/ToastNotification.jsx
import "flowbite"; // importa side-effect: aggiunge Toast a window

// src/components/ToastNotification.jsx
export function showToast(message, type = "success") {
  // Crea il contenitore toast
  const toastEl = document.createElement("div");

  // Classe base: centro pagina, sopra tutti gli altri elementi
  toastEl.className = `
    fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    z-[9999] flex items-center w-auto max-w-xs p-4 mb-4
    text-gray-500 bg-white rounded-lg shadow-lg
    dark:text-gray-400 dark:bg-gray-800
    animate-fadeIn
  `;

  // Contenuto toast
  toastEl.innerHTML = `
    <div class="inline-flex items-center justify-center shrink-0 w-8 h-8 ${
      type === "success"
        ? "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200"
        : type === "danger"
        ? "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200"
        : "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200"
    } rounded-full">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        ${
          type === "success"
            ? '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>'
            : type === "danger"
            ? '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>'
            : '<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>'
        }
      </svg>
    </div>
    <div class="ms-3 text-sm font-normal">${message}</div>
  `;

  document.body.appendChild(toastEl);

  // Dopo 1.5 secondi scompare automaticamente con fade-out
  setTimeout(() => {
    toastEl.classList.add("opacity-0", "transition-opacity", "duration-500");
    setTimeout(() => toastEl.remove(), 500); // rimuove dopo l'animazione
  }, 1500);
}
