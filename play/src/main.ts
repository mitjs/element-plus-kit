import { createApp } from "vue";

import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import elemKit from "meetjs-design";
async function setup() {
  const app = createApp(App);
  app.use(ElementPlus);
  app.use(elemKit);
  app.mount("#app");
}

setup();
