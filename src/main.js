
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'

//懒加载指令插件
import {lazyPlugin} from "@/directtives";
//引入全局组件
import {componentsPlugin} from "@/components";

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)
app.mount('#app')



