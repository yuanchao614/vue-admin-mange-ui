import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userService/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getUserList(params) {
  return request({
    url: '/userService',
    method: 'get',
    params: params
  })
}

export function createUser(data) {
  return request({
    url: '/userService',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/userService/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/userService/${id}`,
    method: 'delete'
  })
}

export function queryUserByMonth(data) {
  return request({
    url: '/userService/queryByMonth',
    method: 'post',
    data
  })
}
