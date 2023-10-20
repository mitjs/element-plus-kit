import theme from 'vitepress/theme'
// import { AntDesignContainer } from '@vitepress-demo-preview/component'
// import '@vitepress-demo-preview/component/dist/style.css'
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'

export default {
    ...theme,
    enhanceApp({ app }) {
        // app.use(demoblockPlugin)
        // app.component('demo-preview', AntDesignContainer)
    }
}