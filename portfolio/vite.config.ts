import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  esbuild: {
    // Silences certain warnings treated as errors (common fix for stuck/hanging builds)
    logOverride: { 'this-is-an-error': 'silent' },
  },
});