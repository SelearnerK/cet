import axios from '../axios'

// 根据cas查询
export const findByCas = (params) => {
  return axios({
    url: '/output/findByCasAndCreator',
    method: 'post',
    params
  })
}
export const save = (data) => {
  return axios({
    url: '/output/save',
    method: 'post',
    data
  })
}

export const dele = (data) => {
  return axios({
    url: '/output/delete',
    method: 'post',
    data
  })
}
