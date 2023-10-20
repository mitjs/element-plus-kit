
import { defineConfig } from 'vitepress'
// import { componentPreview, containerPreview } from "@vitepress-demo-preview/plugin"
import path from 'path'
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import sidebar from './config/sidebar'
import nav from './config/nav'

export default defineConfig({
    base: '/',
    title: 'ElementPlus 神器',
    description: '基于 ElementPlus 的组件生成器',
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
            // md.use(componentPreview)
            // md.use(containerPreview)
            md.use(demoblockPlugin)
        },

    },
    vite: {
        plugins: [demoblockVitePlugin(), vueJsx()],
        resolve: {
            alias: {
                '@alias': path.resolve(__dirname, '../')
            }
        }
    },
})