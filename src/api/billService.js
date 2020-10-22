import request from '@/utils/request'

export function getBillList(params) {
  return request({
    url: '/billService',
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
