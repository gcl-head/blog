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
    document.body.addEventListener('touchstart', function () {})
  }
}
</script>
<style>
  :focus {

    outline: 0;

  }
</style>
