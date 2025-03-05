import theme from "vitepress/theme";
import { inBrowser, type Theme } from 'vitepress'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import '@meetjs/element-plus-kit/dist/index.css'
// 图标并进行全局注册
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { NotFound, globals } from "../vitepress";
import useVisitData from '../hooks/useVisitData';
import './styles/var.css'

export default {
  ...theme,
  NotFound,
  enhanceApp({ app, router }) {
    app.use(ElementPlus as any);

    // 注册所有图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
    // app.component("Demo", VPDemo);
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp as any)
    })

    if (inBrowser) {

      router.onAfterPageLoad = (to) => {
        useVisitData()
      }
    }
  },
} as Theme;
