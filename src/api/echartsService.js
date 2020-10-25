import request from '@/utils/request'


export function getAmontData(data) {
  return request({
    url: '/echartsService/queryAmontByPayMethods',
    method: 'post',
    data
  })
}