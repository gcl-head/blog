// import nav from '@/components/navigation-bar'
// import blog from '@/views/pages/blog'
// import index from '@/views/pages/index'
// 简化加载路径
const nav = () => import('@/components/navigation-bar')
const blog = () => import('@/views/pages/blog')
const index = () => import('@/views/pages/index')
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
