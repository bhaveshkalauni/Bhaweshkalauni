import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        // Same-origin proxy so the browser can load Eurostat Comext without CORS issues.
        '/api/comext': {
          target: 'https://ec.europa.eu/eurostat/api/comext/dissemination/statistics/1.0/data',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/comext/, ''),
          secure: true,
        },
      },
    },
  };
});
