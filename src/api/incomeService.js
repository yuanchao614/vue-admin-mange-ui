import request from '@/utils/request'

export function getIncomeList(params) {
  return request({
    url: '/incomeService',
    method: 'get',
    params: params
  })
}
export function createIncome(data) {
  return request({
    url: '/incomeService',
    method: 'post',
    data
  })
}

export function updateIncome(id, data) {
  return request({
    url: `/incomeService/${id}`,
    method: 'put',
    data
  })
}

export function deleteIncome(id) {
  return request({
    url: `/incomeService/${id}`,
    method: 'delete'
  })
}

export function getIncomeByMonth(data) {
  return request({
    url: '/incomeService/queryByMonth',
    method: 'post',
    data
  })
}
