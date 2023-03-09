import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin()
  ],
  build: {
    rollupOptions: {
      input: {
        app: './src/main.tsx',
      },
      output:{
        dir:"../../../dist/app",
        entryFileNames:"entry.js"
      }
    },
  }
});