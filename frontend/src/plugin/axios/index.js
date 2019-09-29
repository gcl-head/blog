import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: 'bighead.net.cn',
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000 // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})
export default service
