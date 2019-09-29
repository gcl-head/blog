<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <img class="susi" :src="img_url">
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px;">
        <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 120px;">
        <div style="width: 50%">
          最新内容
          <hr>
          <div v-for="item in log" :key="item.name" class="new_log" @click="clickContent(item)">{{ item.name }}</div>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getNewBlog } from '@/api/get_blog'
export default {
  data () {
    return {
      log: [],
      img_url: require('/static/susi.jpg') // 图片地址
    }
  },
  created () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    let that = this
    getNewBlog()
      .then(res => {
        that.log = res.data
      })
    loading.close()
  },
  methods: {
    clickContent (item) {
      this.$emit('search', item) // 上传给外层搜索组件
    }
  }
}
</script>
<style lang="scss" scoped>
  .susi{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .new_log{
    color: #3eaf7c;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
  }
</style>
