<template>
  <el-container>
    <el-aside id="aside" :width="asideWidth">
      <aside-navigation-bar :log="log" @clickContent="clickContent" ref="asideBar"></aside-navigation-bar>
    </el-aside>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col style="max-width: 1300px;">
          <vue-markdown :source="compiledMarkdown" v-if="markdownRefresh" v-highlight></vue-markdown>
          <!-- id 将作为查询条件 -->
          <span :id="$route.path + '/' + currentChoice" class="leancloud_visitors" :data-flag-title="currentChoice">
              <em class="post-meta-item-text">阅读量 </em>
              <i class="leancloud-visitors-count">0</i>
          </span>
          <comments :currentChoice = currentChoice v-if="showComment"></comments>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getBlogItem, getBlogContent } from '@/api/get_blog'
import VueMarkdown from 'vue-markdown' // markdown组件
import comments from '@/components/valine'
export default {
  props: {
    // 搜索文章名称
    blogName: {
      type: String,
      default: ''
    }
  },
  components: {
    VueMarkdown,
    comments
  },
  data () {
    return {
      log: [], // 博客侧边栏目录
      compiledMarkdown: '',
      markdownRefresh: true, // markdown刷新开关
      currentChoice: '', // 当前选择name
      showComment: false, // 是否显示评论栏
      asideWidth: '20rem' // 侧边栏宽度
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
    if (`${document.documentElement.clientWidth}` < 850) { // 如果是手机端登录缩小侧边栏
      this.$nextTick(function () {
        this.asideWidth = '0'
      })
    }
  },
  methods: {
    clickContent (name) {
      // 选择目录
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
          that.compiledMarkdown = '>' + // 增加时间
            '<font color="#808080">创建时间:' + res.data.create_timestamp + '</font>\n' +
            '---\n' + res.data.text
          that.$nextTick(function () {
            that.markdownRefresh = true
          })
          that.$refs.asideBar.activeIndex = name
          this.showComment = false
          this.currentChoice = name
          this.$nextTick(function () {
            this.showComment = true
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
          console.log(that.blogName)
          that.log = res.data
          if (res.data.length === 0) { // 没有目录则隐藏评论栏
            that.compiledMarkdown = ''
            that.showComment = false
            that.currentChoice = ''
          } else if (that.blogName) { // 有选择内容跳转到选择内容
            that.clickContent(that.blogName)
            that.$emit('clear')
          } else { // 否则默认第一条
            that.clickContent(res.data[0].name[0])
          }
          loading.close()
        })
    },
    changeCollapse (isCollapse) {
      // 点击收缩侧边栏图标
      this.$refs.asideBar.changeCollapse(isCollapse)
      if (isCollapse) document.getElementById('aside').style.width = '0'
      else document.getElementById('aside').style.width = '20rem'
    }
  }
}
</script>
