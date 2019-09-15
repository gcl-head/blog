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
