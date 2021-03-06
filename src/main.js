import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // global css

import './permission'
import store from  './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {CaretBottom, DeleteFilled, EditPen, Search, Plus} from '@element-plus/icons-vue'


import hljs from 'highlight.js'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'



const app = createApp(App)
//
app.directive('hlcode', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
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
app.component('EditPen', EditPen)
app.component('CaretBottom', CaretBottom)
app.component('SearchIcon', Search)
app.component('PlusIcon', Plus)
app.use(router).use(store).use(hljsVuePlugin).use(ElementPlus).use(mavonEditor).mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 5000 })
// app.mount('#app')
