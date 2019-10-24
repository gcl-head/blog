<template>
  <el-container ref="homepage">
    <!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
    <el-header style="min-width: 650px;">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="menuSelect" router class="header-all">
        <div class="header-left">
          <i class="el-icon-s-operation icon" @click="changeCollapse" v-if="isBlog"></i>
          <el-menu-item index="/index" style="font-size: 20px;display: inline;">
              大头博客
          </el-menu-item>
        </div>
        <div class="header-right">
          <el-autocomplete
                  v-model="searchState"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  @select="searchSelect"
                  clearable
          ></el-autocomplete>
          <el-menu-item v-for="group in groups" :key="group.id" :index="group.href">{{ group.kind }}</el-menu-item>
          <el-menu-item>
            <el-link href="https://github.com/gcl-head/blog" target="_blank" :underline="false" style="color: #4d2586;">
              GitHub
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" x="0px" y="0px" viewBox="0 0 100 100" width="15" height="15" class="icon outbound"><path fill="currentColor" d="M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"></path> <polygon fill="currentColor" points="45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"></polygon></svg>
            </el-link>
          </el-menu-item>
        </div>
      </el-menu>
    </el-header>
    <router-view ref="router" @search="searchSelect" @clear="clearBlogName"/>
  </el-container>
</template>
<script>
import { getBlogGroup, search } from '@/api/get_blog'
export default {
  name: 'navigation-bar',
  data () {
    return {
      clientHeight: '', // 浏览器可视区域高度
      activeIndex: '/' + this.$route.params.href,
      groups: [], // 导航栏目录列表
      blogHref: '', // href
      isCollapse: false, // 侧边栏是否收缩
      isBlog: this.$route.path !== '/index', // 当前导航栏是否为博客页
      searchState: '', // 搜索状态
      searchName: '' // 搜索内容对应的文章标题
    }
  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let that = this
    getBlogGroup()
      .then(res => {
        that.groups = res.data
      })
    loading.close()
  },
  mounted () {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp () {
      this.clientHeight = `${document.documentElement.clientHeight}`
    }
    if (`${document.documentElement.clientWidth}` < 850) { // 如果是手机端登录缩小侧边栏
      this.isCollapse = true
    }
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    changeFixed (clientHeight) {
      this.$refs.homepage.$el.style.height = clientHeight - 20 + 'px' // 根据可视区域高度改变el-container高度使header始终在页面上方浮动
    },
    changeCollapse () {
      // 点击收缩侧边栏图标
      if (this.isCollapse) {
        this.isCollapse = false
        this.$refs.router.changeCollapse(this.isCollapse)
      } else {
        this.isCollapse = true
        this.$refs.router.changeCollapse(this.isCollapse)
      }
    },
    menuSelect (index) {
      if (index === '/index') this.isBlog = false // 是否隐藏收缩侧边栏图标
      else this.isBlog = true
    },
    querySearch (queryString, cb) {
      // 搜索框内容变化调用
      if (queryString) {
        search(queryString)
          .then(res => {
            cb(res.data)
          })
      }
    },
    searchSelect (item) {
      // 选择搜索框下拉列表结果
      this.isBlog = true
      this.searchName = item.name // 想blog组件传递当前选择的文章名字
      this.$router.push({path: item.href + '/' + this.searchName})
    },
    clearBlogName () {
      this.searchName = '' // 清空当前选择文章名字
    }
  }
}
</script>
<style lang="scss" scoped>
  .header-all{
    display: flex;
    .header-left{
      flex: 1;
      background-color: white;
      .icon{
        width: 20px;
        height: 20px;
        align-self: center;
      }
      .is-active{
        color: black;
        background-color: white;
      }
    }
    .header-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .is-active{
        border-bottom: 1px solid #3eaf7c;
        color: #3eaf7c;
        background-color: white;
      }
    }
  }
</style>
<style lang="scss">
  .el-header{
    .el-menu-item:focus, .el-menu-item:hover{
      background-color: white;
    }
    .el-link:hover{
      background-color: white;
    }
    .el-autocomplete{
      top: 0.5rem;
    }
  }
</style>
