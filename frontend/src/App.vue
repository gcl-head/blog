<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view ref="bar" />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      console.log('change')
      this.$refs.bar.changeCollapse()
    }
  }
}
</script>
<style>
  :focus {

    outline: 0;

  }
</style>
