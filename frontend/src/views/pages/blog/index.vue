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
      href: this.$route.path, // 当前href
      compiledMarkdown: '',
      loading: false // 加载图标
    }
  },
  created () {
    this.loading = true
    const that = this
    getBlogItem({
      blogHref: that.href
    })
      .then(res => {
        that.log = res.data
        this.loading = false
      })
  },
  methods: {
    clickContent (name) {
      this.loading = true
      const that = this
      getBlogContent({
        blogHref: that.href,
        blogName: name
      })
        .then(res => {
          that.compiledMarkdown = res.data
          this.loading = false
        })
    }
  }
}
</script>
