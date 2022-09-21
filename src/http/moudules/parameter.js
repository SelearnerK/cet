import axios from '../axios'

export const save = (data) => {
  return axios({
    url: '/parameter/save',
    method: 'post',
    data
  })
}
export const findByCas = (params) => {
  return axios({
    url: '/parameter/findByCas',
    method: 'get',
    params
  })
}
