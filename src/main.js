import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// import RouterView from 'vue-router'
// 全局注册组件，对所有page可见
// import ArticleIndex from './views/article/index.vue'
// app.component('ArticleIndex', ArticleIndex)
// app.component('ElementPlus', ElementPlus)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
