import axios from '../axios'

export const save = (data) => {
  return axios({
    url: '/density/save',
    method: 'post',
    data
  })
}
export const findByCas = (params) => {
  return axios({
    url: '/density/findByCas',
    method: 'get',
    params
  })
}