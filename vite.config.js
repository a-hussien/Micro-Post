import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

const host = 'micro-blog.test';

export default defineConfig({
    server: {
        host,
        hmr: { host },
        https: {
            key: fs.readFileSync(`D:/laragon/etc/ssl/laragon.key`),
            cert: fs.readFileSync(`D:/laragon/etc/ssl/laragon.crt`),
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});
