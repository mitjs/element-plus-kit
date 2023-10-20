import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
    return {
        base: './',
        plugins: [
            vue(),
        ],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: resolve(__dirname, "./src"),
                },
            ],
        },


    };
});
