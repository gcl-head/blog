<template>
  <el-container>
    <el-aside id="aside" :width="asideWidth">
      <aside-navigation-bar :log="log" :activeIndex="activeIndex" @clickContent="clickContent" ref="aside_bar"></aside-navigation-bar>
    </el-aside>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col style="max-width: 1300px;">
          <vue-markdown :source="compiledMarkdown" v-if="markdownRefresh" v-highlight></vue-markdown>
          <!-- id 将作为查询条件 -->
          <span :id="$route.path" class="leancloud_visitors" :data-flag-title="$route.params.name">
              <em class="post-meta-item-text">阅读量 </em>
              <i class="leancloud-visitors-count">0</i>
          </span>
          <comments v-if="showComment"></comments>
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
      showComment: false, // 是否显示评论栏
      asideWidth: '20rem', // 侧边栏宽度
      activeIndex: '' // 当前选择name
    }
  },
  watch: {
    '$route' () { // 监听路由变化
      this.init()
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
    clickContent () {
      // 选择目录
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const that = this
      getBlogContent({
        blogHref: '/' + that.$route.params.href,
        blogName: that.$route.params.name
      })
        .then(res => {
          that.markdownRefresh = false
          that.compiledMarkdown = '>' + // 增加时间
            '<font color="#808080">创建时间:' + res.data.create_timestamp + '</font>\n' +
            '<font color="#808080">最后修改时间:' + res.data.last_edit_timestamp + '</font>\n' +
            '---\n' + res.data.text
          that.$nextTick(function () {
            that.markdownRefresh = true
          })
          that.activeIndex = that.$route.path
          this.showComment = false
          // this.currentChoice = that.$route.params.name
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
        blogHref: '/' + that.$route.params.href
      })
        .then(res => {
          that.log = res.data
          if (res.data.length === 0) { // 没有目录则隐藏评论栏
            that.compiledMarkdown = ''
            that.showComment = false
          } else if (that.$route.params.name !== undefined) { // 有选择内容跳转到选择内容
            that.clickContent(that.$route.params.name)
            that.$emit('clear')
          } else { // 否则默认第一条
            this.$router.push({path: that.$route.params.href + '/' + res.data[0].name[0]})
          }
          loading.close()
        })
    },
    changeCollapse (isCollapse) {
      // 点击收缩侧边栏图标
      this.$refs.aside_bar.changeCollapse(isCollapse)
      if (isCollapse) document.getElementById('aside').style.width = '0'
      else document.getElementById('aside').style.width = '20rem'
    }
  }
}
</script>
