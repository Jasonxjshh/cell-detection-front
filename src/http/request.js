import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    // 添加请求头等前置处理
    config.headers['token'] = localStorage.getItem('token')
    return config
  },
  error => {
    // 请求错误处理
    console.log('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 响应后处理
    if (response.status === 200 && response.data.code === 200) {
      return Promise.resolve(response.data.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    console.log('Response Error:', error)
    return Promise.reject(error)
  }
)

export default service
