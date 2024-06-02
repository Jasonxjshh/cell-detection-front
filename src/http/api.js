import request from './request.js'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
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

// 删除用户信息
export function deleteUsers(data) {
  return request({
    url: '/user/deleteUsers',
    method: 'post',
    data
  })
}


// 增加一个用户
export function add(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 获得所有用户信息
export function getUsersByPage(params) {
  return request({
      url: '/user/getUsersByPage/'+ Number(params['currentPage']) + '/' + Number(params['pageSize'])+ '/' + Number(params['role']),
      method: 'get',
  })
}



// 获得所有日志信息
export function getLogsByPage(params) {
  return request({
      url: '/log/getLogsByPage/'+ Number(params['currentPage']) + '/' + Number(params['pageSize']),
      method: 'get',
  })
}

// 删除日志信息
export function deleteLogs(data) {
  return request({
    url: '/log/deleteLogs',
    method: 'post',
    data
  })
}

export function getLogs() {
  return request({
    url: '/log/getLogs',
    method: 'get'
  })
}

// 修改日志状态
export function updateStatus(data) {
  return request({
    url: '/log/updateStatus',
    method: 'post',
    data
  })
}