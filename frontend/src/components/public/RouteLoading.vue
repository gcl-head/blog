<template>
  <h1>加载中...</h1>
</template>
<script>
export default {
  name: 'RouteLoading',
  created () {
    this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 1)'
    })
  }
}
</script>
