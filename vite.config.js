import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // Importa VitePWA
import tailwindcss from '@tailwindcss/vite'; // Assicurati di avere anche questo se lo stai usando

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Se stai usando Tailwind CSS v4 con il plugin specifico
    VitePWA({
      registerType: 'autoUpdate', // O 'prompt' se vuoi chiedere all'utente di aggiornare
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Aggiungi qui tutte le risorse che vuoi pre-cacheare
      manifest: {
        name: 'La Mia To-Do List PWA',
        short_name: 'ToDo PWA',
        description: 'Una semplice To-Do List trasformata in PWA',
        theme_color: '#ffffff', // Colore della barra di stato/barra del browser
        background_color: '#ffffff', // Colore dello sfondo all'avvio
        display: 'standalone', // O 'fullscreen', 'minimal-ui'
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // Icona che si adatta alle diverse forme (Android)
          },
        ],
      },
    }),
  ],
});