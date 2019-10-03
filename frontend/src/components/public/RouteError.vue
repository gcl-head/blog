<template>
  <div>
    <h1>网络问题</h1>
    <h1>请稍后重试!</h1>
  </div>
</template>
<script>
export default {
  name: 'RouteLoading',
  created () {
    this.$loading.close()
  }
}
</script>
