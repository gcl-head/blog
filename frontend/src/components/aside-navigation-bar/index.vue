<template>
  <div class="log">
    <el-menu @select="handleSelect" text-color="#2c3e50" active-text-color="#3eaf7c">
      <div v-for="item in log" :key="item.title" class="log-links">
        <p class="log-header">{{ item.title }}</p>
        <el-menu-item :index="iitem" v-for="iitem in item.name" :key="iitem">{{ iitem }}</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'aside-navigation-bar',
  props: {
    log: {
      default: [
        {
          title: '暂无内容',
          name: []
        }
      ]
    }
  },
  methods: {
    handleSelect (key) {
      this.$emit('clickContent', key) // 点击目录内容跳转
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
      padding: 1.5rem 0;
      display: block;
      .log-header{
        color: #2c3e50;
        font-size: 1.1em;
        font-weight: 700;
        padding: .35rem 1.5rem .35rem 1.25rem;
        width: 100%;
        border-left: .25rem solid transparent;
        box-sizing: border-box;
      }
    }
  }
</style>
<style lang="scss">
  .el-aside{
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
