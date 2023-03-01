import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/index.scss' // global css

import './permission'
import store from  './store'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {CaretBottom, DeleteFilled, EditPen, Search, Plus,User,Lock} from '@element-plus/icons-vue'


import hljs from 'highlight.js'

import mavonEditor from 'mavon-editor'
// note 这里引入的css能够全局使用
import 'mavon-editor/dist/css/index.css'

import TinyEditor from '@tinymce/tinymce-vue'
// var Editor = require('@tinymce/tinymce-vue').default;

const app = createApp(App)
//
app.directive('hlcode', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightElement(block)
    })
})
import 'highlight.js/styles/vs2015.css'

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
app.component('UserIcon', User)
app.component('LockIcon', Lock)
app.use(router).use(store).use(TinyEditor).use(ElementPlus).use(mavonEditor).mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 5000 })
// app.mount('#app')
