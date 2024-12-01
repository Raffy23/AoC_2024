/// <reference types="vitest" />
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
