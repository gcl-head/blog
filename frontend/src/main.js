// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 路由设置
import Vuex from 'vuex' // vuex
// store
import store from '@/store/index'
// Element
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 代码高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css'
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

// Vue.config.productionTip = false // 关闭消息提示

/* 注册全局组件 */
Vue.component('aside-navigation-bar', () => import('@/components/aside-navigation-bar/index.vue'))

/* eslint-disable no-new */
Vue.use(Vuex)
// Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
