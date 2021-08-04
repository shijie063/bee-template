import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import html from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "src/theme/var.scss";'
            }
        }
    },
    plugins: [
        vue(), vueJsx(), html({
            inject: { // vite打包也将变量注入到html中
                injectData: {
                    title: 'bee-template',
                    injectScript: '<script type="module" src="/src/main.ts"></script>',
                },
            },
            minify: true,
        })
    ]
});
