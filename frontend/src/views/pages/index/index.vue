<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <img :class="img_class" :src="img_src" v-on:click="hideImg">
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 10px;">
        <span :id="$route.path" class="leancloud_visitors" data-flag-title="首页">
              <em class="post-meta-item-text">本站访问量 </em>
              <i class="leancloud-visitors-count">0</i>次
          </span>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 120px;">
        <ul style="max-width: 600px;">
          最新内容
          <hr>
          <li v-for="item in log" :key="item.name" class="new_log" @click="clickContent(item)">{{ item.name }}</li>
          <comments></comments>
        </ul>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
import { getNewBlog } from '@/api/get_blog'
import comments from '@/components/valine'
import susi from '../../../assets/susi.png'
import alligator from '../../../assets/alligator.png'
export default {
  data () {
    return {
      log: [],
      img_class: 'susi', // 图片类
      img_src: susi // 图片src
    }
  },
  components: {
    comments
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
    },
    hideImg () {
      this.img_class = 'no_susi'
      setTimeout(this.changeImg, 500)
    },
    changeImg () {
      this.img_src = this.img_src === susi ? alligator : susi
      this.img_class = 'susi'
    }
  }
}
</script>
<style lang="scss" scoped>
  .susi{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    z-index: 1;
    transition: 0.5s;
  }
  .no_susi{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    z-index: 1;
    transform: rotateY(90deg);
    transition: 0.5s;
  }
  .new_log{
    color: #3eaf7c;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
  }
</style>
