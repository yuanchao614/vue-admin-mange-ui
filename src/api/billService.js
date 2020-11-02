import request from '@/utils/request'

export function getBillList(params) {
  return request({
    url: '/billService',
    method: 'get',
    params: params
  })
}

export function createBill(data) {
  return request({
    url: '/billService',
    method: 'post',
    data
  })
}

export function updateBill(id, data) {
  return request({
    url: `/billService/${id}`,
    method: 'put',
    data
  })
}

export function deleteBill(id) {
  return request({
    url: `/billService/${id}`,
    method: 'delete'
  })
}

export function getBillByMonth(data) {
  return request({
    url: '/billService/queryByMonth',
    method: 'post',
    data
  })
}

export function getTodayData(data) {
  return request({
    url: '/billService/today',
    method: 'post',
    data
  })
}
