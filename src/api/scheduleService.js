import request from '@/utils/request'

export function getScheduleList(params) {
  return request({
    url: '/toDoService',
    method: 'get',
    params: params
  })
}

export function createSchedule(data) {
  return request({
    url: '/toDoService',
    method: 'post',
    data
  })
}

export function deleteSchedule(id) {
  return request({
    url: `/toDoService/${id}`,
    method: 'delete'
  })
}

export function updateSchedule(id, data) {
  return request({
    url: `/toDoService/${id}`,
    method: 'put',
    data
  })
}

