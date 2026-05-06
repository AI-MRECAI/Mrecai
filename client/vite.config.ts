import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import prerender from 'vite-plugin-prerender'; // Temporarily disabled for environment check

export default defineConfig({
    plugins: [
        react(),
        /* 
        AEO Prerendering: Enable this to generate static HTML for AI indexability.
        Note: Requires a stable renderer environment (Puppeteer/JSDOM).
        */
        /*
        prerender({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/about',
            '/services',
            '/services/strategic-tax-planning',
            '/services/risk-architecture',
            '/services/ai-driven-growth',
            '/resources/executives-guide-to-ai',
            // ... add other routes as needed
          ],
          renderer: 'jsdom',
        }),
        */
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/pages': path.resolve(__dirname, './src/pages'),
            '@/utils': path.resolve(__dirname, './src/utils'),
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    'animation-vendor': ['framer-motion'],
                    'icon-vendor': ['react-icons']
                }
            }
        }
    }
});
