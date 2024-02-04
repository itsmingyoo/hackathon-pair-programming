import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgrPlugin({
          // SVGR options (optional)
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
            },
            '/socket': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
                ws: true,
            },
        },
    },
});
