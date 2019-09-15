<template>
  <el-container  :v-loading="loading">
    <el-header>
      <el-menu :default-active="activeIndex" mode="horizontal" router>
        <div class="header-left">
          <el-menu-item index="/index" style="font-size: 20px;">
              大头博客
          </el-menu-item>
        </div>
        <div class="header-right">
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
    <router-view/>
  </el-container>
</template>
<script>
import { getBlogGroup } from '@/api/get_blog'
export default {
  name: 'navigation-bar',
  data () {
    return {
      activeIndex: this.$route.path,
      groups: [], // 导航栏目录列表
      blogHref: '', // href
      loading: false // 加载图标
    }
  },
  created () {
    this.loading = true
    let that = this
    getBlogGroup()
      .then(res => {
        that.groups = res.data
        this.loading = false
      })
  }
}
</script>
<style lang="scss" scoped>
  .header-left{
    position: absolute;
    background-color: white;
    .is-active{
      color: black;
      background-color: white;
    }
  }
  .header-right {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    .is-active{
      border-bottom: 1px solid #3eaf7c;
      color: #3eaf7c;
      background-color: white;
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
  }
</style>
