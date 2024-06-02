import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import axios from 'axios'
import { useTokenStore } from './stores/user'

// import axios from 'axios'

// Vue.prototype.$http = axios


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$http = axios;


app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.provide('$axios', axios)

const tokenStore = useTokenStore();
if (tokenStore.token && tokenStore.role) {
    switch (tokenStore.role) {
      case 0:
        router.push({ name: 'adminDashboard' });
        break;
      case 1:
        router.push({ name: 'doctorDashboard' });
        break;
      case 2:
        router.push({ name: 'patientDashboard' });
        break;
      default:
        router.push({ name: 'login' });
    }
  }


app.mount('#app')
