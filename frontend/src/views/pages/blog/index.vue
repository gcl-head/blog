<template>
  <el-container>
    <el-aside>
      <aside-navigation-bar :log="log" @clickContent="clickContent"></aside-navigation-bar>
    </el-aside>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <vue-markdown :source="compiledMarkdown" v-if="markdownRefresh" v-highlight></vue-markdown>
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
      log: [], // 博客侧边栏目录
      compiledMarkdown: '',
      markdownRefresh: true // markdown刷新开关
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
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const that = this
      getBlogContent({
        blogHref: that.$route.path,
        blogName: name
      })
        .then(res => {
          that.markdownRefresh = false
          that.compiledMarkdown = res.data
          that.$nextTick(function () {
            that.markdownRefresh = true
          })
          loading.close()
        })
    },
    init () {
      // 导航栏切换刷新页面
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const that = this
      getBlogItem({
        blogHref: that.$route.path
      })
        .then(res => {
          that.log = res.data
          if (res.data.length === 0) {
            that.compiledMarkdown = ''
          } else {
            that.clickContent(res.data[0].name[0])
          }
          loading.close()
        })
    }
  }
}
</script>
