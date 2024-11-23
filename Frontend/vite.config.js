import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
    server: {
        proxy: {
            // Proxy API calls if needed
            '/api': {
                target: 'https://localhost:5000',
                changeOrigin: true,
            },
        },
    },
});
