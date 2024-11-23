import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'build', // specify the output directory for the build files
        sourcemap: true, // optional: enable source maps for debugging production code
    },
    server: {
        port: 5000, // default port for local development, can be changed
    },
    preview: {
        port: 5000, // Port for previewing the build
    },
});
