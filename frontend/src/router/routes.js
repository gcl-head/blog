// import nav from '@/components/navigation-bar'
// import blog from '@/views/pages/blog'
// import index from '@/views/pages/index'
// 简化加载路径
function lazyLoadView (AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 `Promise` 对象)
    component: AsyncView,
    // 异步组件加载时使用的组件
    loading: require('@/components/public/RouteLoading.vue').default,
    // 加载失败时使用的组件
    error: require('@/components/public/RouteError.vue').default,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 60000
  })
  return Promise.resolve({
    functional: true,
    render (h, { data, children }) {
      return h(AsyncHandler, data, children)
    }
  })
}

const nav = () => lazyLoadView(import('@/components/navigation-bar').then())
const blog = () => lazyLoadView(import('@/views/pages/blog').then())
const index = () => lazyLoadView(import('@/views/pages/index').then())
// 主框架
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: nav,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '大头博客 - 首页'
        },
        component: index
      },
      // 博客页面
      {
        path: 'frontend',
        name: 'frontend',
        meta: {
          title: '大前端 - 大头的博客们'
        },
        component: blog
      },
      {
        path: 'algorithm',
        name: 'algorithm',
        meta: {
          title: '算法修炼 - 大头的博客们'
        },
        component: blog
      },
      {
        path: 'life',
        name: 'life',
        meta: {
          title: '生活小记 - 大头的博客们'
        },
        component: blog
      },
      {
        path: 'project',
        name: 'project',
        meta: {
          title: '项目经历 - 大头的博客们'
        },
        component: blog
      }
    ]
  }
]
export default [
  ...frameIn
]
