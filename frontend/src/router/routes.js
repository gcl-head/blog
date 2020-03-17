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

const nav = () => lazyLoadView(import('@/components/navigation-bar'))
const blog = () => lazyLoadView(import('@/views/pages/blog'))
const index = () => lazyLoadView(import('@/views/pages/index'))
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
          title: '首页-大头的家'
        },
        component: index
      },
      // 博客页面
      {
        path: ':href',
        name: 'blog',
        meta: {
          title: '大头的家'
        },
        component: blog
      },
      {
        path: ':href/:name',
        name: 'blog',
        meta: {
          title: '大头的家'
        },
        component: blog
      }
    ]
  }
]
export default [
  ...frameIn
]
