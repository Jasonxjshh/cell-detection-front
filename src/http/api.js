import request from './request.js'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUserByToken(token) {
  return request({
    url: '/user/getUSerByToken',
    method: 'get',
    params:{
      token: token 
    }
  })
}
