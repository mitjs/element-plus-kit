import { defineConfig } from "vitepress";
// import { componentPreview, containerPreview } from "@vitepress-demo-preview/plugin"
import path from "path";
// import vueJsx from "@vitejs/plugin-vue-jsx";
// import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import sidebar from "./config/sidebar";
import nav from "./config/nav";
import { mdPlugin } from "./config/plugins";

export default defineConfig({
  // base: "/",
  title: "ElementPlus Kit",
  description: "基于 ElementPlus 的组件生成器",
  head: [
    ['link', { rel: 'icon', href: 'logo.png' }],
    ["meta", { name: 'referrer', content: 'no-referrer' }]
  ],
  themeConfig: {
    logo: 'logo.png',
    outline: [2, 3],
    nav, //头部导航
    sidebar, //侧边栏
    search: {
      provider: 'local'
    },
    socialLinks: [
      {
        icon: {
          svg: '<svg t="1740101152421" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2377" width="48" height="48"><path d="M870.632727 753.338182c0 36.538182-19.316364 44.916364-19.316363 44.916363L500.596364 1000.727273A39.330909 39.330909 0 0 1 465.454545 1000.727273S121.018182 800.581818 108.450909 791.272727a30.021818 30.021818 0 0 1-12.8-23.272727V354.676364c0-18.152727 23.272727-30.952727 23.272727-30.952728l343.272728-198.981818a46.545455 46.545455 0 0 1 41.658181 0l336.523637 195.723637a47.941818 47.941818 0 0 1 29.090909 47.941818v384.930909z m-137.309091-395.636364L496.872727 221.090909a37.003636 37.003636 0 0 0-32.814545 0L193.861818 375.854545s-17.92 10.705455-17.687273 25.134546 0 323.956364 0 323.956364a23.272727 23.272727 0 0 0 10.007273 17.454545c10.007273 6.981818 279.272727 162.909091 279.272727 162.909091a30.487273 30.487273 0 0 0 27.694546 0c16.756364-9.309091 274.850909-158.021818 274.850909-158.021818s15.127273-6.516364 15.127273-35.141818v-80.756364l-302.545455 183.854545V744.727273a70.981818 70.981818 0 0 1 23.272727-48.174546L772.654545 535.272727a56.785455 56.785455 0 0 0 12.8-33.978182v-72.378181l-305.105454 184.32v-74.472728a51.665455 51.665455 0 0 1 19.316364-41.658181z m222.487273-259.490909a9.076364 9.076364 0 0 0-8.610909-9.774545H884.363636V24.669091c0-3.723636-6.050909-5.12-12.334545-5.12L837.818182 25.134545c-4.189091 0-7.214545 2.792727-7.214546 5.352728V88.436364H768a9.309091 9.309091 0 0 0-8.378182 8.610909v46.545454h69.818182V209.454545c0 3.723636 6.050909 6.283636 12.567273 5.352728l35.141818-5.818182c4.189091 0 6.749091-3.025455 6.749091-5.352727V142.894545h69.818182z" fill="#409EFF" p-id="2378"></path></svg>'
        },
        link: 'https://element-plus.org/zh-CN/'
      },
      { icon: 'github', link: 'https://github.com/mitjs/element-plus-kit' },
    ],
  },
  markdown: {
    theme: {
      light: "vitesse-light",
      dark: "vitesse-dark",
    },
    lineNumbers: true,
    config(md) {
      mdPlugin(md);
    },
  },
  vite: {
    plugins: [],
    resolve: {
      alias: {
        "@alias": path.resolve(__dirname, "../"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modren-complier',
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
});
