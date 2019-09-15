<template>
  <el-container :v-loading="loading">
    <el-aside>
      <aside-navigation-bar :log="log" @clickContent="clickContent"></aside-navigation-bar>
    </el-aside>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <vue-markdown :source="compiledMarkdown" v-highlight></vue-markdown>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getBlogItem, getBlogContent } from '@/api/get_blog'
import VueMarkdown from 'vue-markdown' // markdown组件
export default {
  components: {
    VueMarkdown
  },
  data () {
    return {
      log: null, // 博客侧边栏目录
      compiledMarkdown: '',
      loading: false // 加载图标
    }
  },
  watch: {
    '$route' () { // 监听路由变化
      let that = this
      that.init()
    }
  },
  created () {
    this.init()
  },
  methods: {
    clickContent (name) {
      console.log(1)
      this.loading = true
      const that = this
      getBlogContent({
        blogHref: that.$route.path,
        blogName: name
      })
        .then(res => {
          that.compiledMarkdown = res.data
          this.loading = false
        })
    },
    init () {
      // 导航栏切换刷新页面
      this.loading = true
      const that = this
      getBlogItem({
        blogHref: that.$route.path
      })
        .then(res => {
          that.log = res.data
          this.loading = false
        })
    }
  }
}
</script>
