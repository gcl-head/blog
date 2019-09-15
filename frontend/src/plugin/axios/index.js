import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://139.155.27.69:8888/',
  timeout: 5000 // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})
export default service
