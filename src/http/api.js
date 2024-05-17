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

// 修改用户信息
export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}