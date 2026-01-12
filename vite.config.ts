import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5000', // Adjust to your backend port if different
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
