import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由数据
import routes from './routes'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})
/**
 * 路由拦截
 * 权限验证
 */
router.afterEach(async (to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '大头的博客'
  }
})
export default router
