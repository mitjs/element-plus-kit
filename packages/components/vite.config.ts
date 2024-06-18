import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from "vite-plugin-dts";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outDir: "./dist/types",
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    target: "modules",
    minify: true,
    rollupOptions: {
      // 忽略vue文件
      external: ["vue"],
      input: ["index.ts"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].es.js",
          preserveModules: false,
          dir: "dist/es",
          preserveModulesRoot: "dist/es",
        },
        {
          format: "cjs",
          entryFileNames: "[name].cjs.js",
          preserveModules: false,
          dir: "dist/cjs",
          preserveModulesRoot: "dist/cjs",
        },
      ],
    },
    lib: {
      entry: "index.ts",
      formats: ["es", "cjs"],
    },
  },
});
