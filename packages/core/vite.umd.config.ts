import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig({
    plugins: [vue(), jsx(), removeConsole()],
    build: {
        outDir: 'dist/umd',
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'elementplus-kit',
            fileName: 'index',
            formats: ['umd'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                exports: "named",
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') {
                        return 'index.css'
                    }
                    return assetInfo.name as string
                }
            },
        },
        terserOptions: {
            compress: {
                // 生产环境移除console debugger
                drop_console: true,
                drop_debugger: true
            }
        }
    },
});