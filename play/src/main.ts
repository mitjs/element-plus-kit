import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElemKit from '@meetjs/element-plus-kit'
import '@meetjs/element-plus-kit/dist/index.css'

createApp(App).use(ElementPlus).use(ElemKit).mount('#app')
