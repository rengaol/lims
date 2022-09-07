import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).mount('#app')
