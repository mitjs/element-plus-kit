
import { defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from "@vitepress-demo-preview/plugin"
import sidebar from './config/sidebar'
import nav from './config/nav'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
    base: '/',
    title: 'vue3 组件库',
    description: 'vue3 组件库',
    // head: [
    //     ['meta', { name: 'theme-color', content: '#646cff' }],
    //     ["meta", { name: 'referrer', content: 'no-referrer' }]
    // ],
    themeConfig: {
        // logo: '/logo.svg',
        outline: [2, 3],
        nav, //头部导航 
        sidebar,  //侧边栏
    },
    markdown: {
        theme: {
            light: "vitesse-light",
            dark: "vitesse-dark"
        },
        lineNumbers: true,
        config(md) {
            md.use(componentPreview)
            md.use(containerPreview)
        },
    }
})