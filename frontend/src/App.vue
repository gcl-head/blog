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
    console.log('test')
    let p = navigator.platform
    let win = p.indexOf('Win') === 0
    let mac = p.indexOf('Mac') === 0
    let x11 = (p === 'X11') || (p.indexOf('Linux') === 0)
    if (win || mac || x11) {
    } else {
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
