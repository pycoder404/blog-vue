import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import hljs from 'highlight.js'
// import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {DeleteFilled, EditPen} from '@element-plus/icons-vue'
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
app.use(router).use(hljsVuePlugin).use(ElementPlus).use(mavonEditor).mount('#app')
// app.use(ElementPlus, { size: 'small', zIndex: 5000 })
// app.mount('#app')
