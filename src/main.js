import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import './assets/styles/reset.css'
import './assets/styles/global.css'
import './assets/styles/animations.css'
import './assets/styles/responsive.css'

const app = createApp(App)
app.use(router)
app.use(createHead())
app.mount('#app')
