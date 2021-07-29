import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:3000/api/buy_status/search',
    method: 'get',
    params
  })
}
