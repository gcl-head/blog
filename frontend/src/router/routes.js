import nav from '@/components/navigation-bar'
import blog from '@/views/pages/blog'
import index from '@/views/pages/index'
// 简化加载路径
// const _import = file => () => import('@/views/' + file)
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
          title: '大头博客的首页'
        },
        component: index
      },
      // 博客页面
      {
        path: 'frontend',
        name: 'frontend',
        meta: {
          title: '大头的博客们'
        },
        component: blog
      },
      {
        path: 'algorithm',
        name: 'algorithm',
        meta: {
          title: '大头的博客们'
        },
        component: blog
      },
      {
        path: 'life',
        name: 'life',
        meta: {
          title: '大头的博客们'
        },
        component: blog
      },
      {
        path: 'project',
        name: 'project',
        meta: {
          title: '大头的博客们'
        },
        component: blog
      }
    ]
  }
]
export default [
  ...frameIn
]
