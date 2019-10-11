<template>
  <div id="vcomments"></div>
</template>
<script>
export default {
  props: {
    currentChoice: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.createValine()
  },

  methods: {
    createValine () {
      const Valine = require('valine')
      const that = this
      window.AV = require('leancloud-storage')
      let valine = new Valine()
      valine.init({
        el: '#vcomments',
        appId: 'M40skc4mCiCskeW7JKep07Ge-gzGzoHsz',
        appKey: 'UdtgcabRV6hy6O0AdEzm8jo8',
        notify: true,
        verify: true,
        avatar: 'retro',
        path: that.$route.path,
        placeholder: '欢迎留言与我分享您的想法...',
        visitor: true // 阅读量统计
      })
      this.valineRefresh = false
    }
  },
  watch: {
    '$route' () {
      // 重新刷新valine
      this.createValine()
    }
  }
}
</script>
