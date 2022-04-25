import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { DeleteFilled } from '@element-plus/icons-vue'

const app = createApp(App)
// import RouterView from 'vue-router'
// 全局注册组件，对所有page可见
// import ArticleIndex from './views/article/index.vue'
// app.component('ArticleIndex', ArticleIndex)
// app.component('ElementPlus', ElementPlus)
// Object.keys(ElIconModules).forEach(function (key) {
//     app.component((ElIconModules[key], ElIconModules[key]))
// })
// for (const name in ElIconModules){
//     app.component(name,(ElIconModules as any)[name])
// }
app.component('DeleteFilled', DeleteFilled)
app.use(router).use(ElementPlus).mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 5000 })
// app.mount('#app')
