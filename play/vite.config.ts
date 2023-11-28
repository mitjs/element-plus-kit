import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  return {
    base: "./",
    plugins: [vue(), vueJsx()],
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
