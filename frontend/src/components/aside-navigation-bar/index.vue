<template>
  <div class="log" id="log">
    <el-menu :collapse="isCollapse" text-color="#2c3e50" active-text-color="#3eaf7c" :default-active="activeIndex" router>
      <div v-for="item in log" :key="item.title" class="log-links">
        <el-submenu :index="item.title">
          <template slot="title"  class="log-header">
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item :index="'/'+$route.params.href+'/'+iitem" v-for="iitem in item.name" :key="iitem">{{ iitem }}</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'aside-navigation-bar',
  props: {
    log: {
      default: []
    },
    activeIndex: {
      default: '' // 当前选中index
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    da () {
      if (this.log.length === 0) return ''
      return this.log[0].name[0]
    }
  },
  created () {
    if (`${document.documentElement.clientWidth}` < 850) { // 如果是手机端登录缩小侧边栏
      this.$nextTick(function () {
        document.getElementById('log').style.width = '0'
      })
    }
  },
  methods: {
    changeCollapse (isCollapse) {
      this.isCollapse = isCollapse
      if (isCollapse) {
        document.getElementById('log').style.width = '0'
      } else {
        document.getElementById('log').style.width = '20rem'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .log{
    position: fixed;
    width: 20rem;
    top: 70px;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
    z-index: 10;
    display: block;
    padding-left: 0;
    .log-links{
      display: block;
      .log-header{
        color: #2c3e50;
        font-size: 1.1em;
        font-weight: 700;
        padding: .35rem 1.5rem 0 1.25rem;
        width: 100%;
        border-left: .25rem solid transparent;
        box-sizing: border-box;
      }
    }
  }
</style>
<style lang="scss">
  .el-aside{
    width: 20rem;
    .el-menu--collapse{
      width: 0;
    }
    .el-menu{
      overflow: hidden;
      padding-left: 0;
      .el-menu-item{
        color: #2c3e50;
        height: auto;
        font-size: 1em;
        font-weight: 400;
        border-left: .25rem solid transparent;
        padding: .35rem 1rem .35rem 2.25rem;
        line-height: 1.4;
        width: 100%;
        white-space:normal; // 强制换行
        box-sizing: border-box;
        display: inline-block;
      }
      .el-menu-item:focus{
        background-color: white;
        font-weight: 600;
        color: #3eaf7c;
        border-left-color: #3eaf7c;
      }
    }
  }
</style>
