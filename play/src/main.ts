import { createApp } from 'vue'

import App from './App.vue'

async function setup() {
    const app = createApp(App)

    app.mount('#app')
}

setup()