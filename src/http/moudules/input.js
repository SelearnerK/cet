import axios from '../axios'
import id from "element-ui/src/locale/lang/id";

/*
 * 用户管理模块
 */

// // 保存
// export const add = (data) => {
//   return axios({
//     url: '/input/',
//     method: 'post',
//     data
//   })
// }
// 保存
export const save = (data) => {
  return axios({
    url: '/input/save',
    method: 'post',
    data
  })
}
export const saveAs = (data) => {
  return axios({
    url: '/input/saveas',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/input/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (data) => {
  return axios({
    url: '/input/findPage',
    method: 'post',
    data
  })
}

// 查询所有
export const findAllInput = () => {
  return axios({
    url: '/input/findAll',
    method: 'get',
  })
}

// 根据ID查询
export const findByID = (params) => {
  return axios({
    url: '/input/findByID',
    method: 'get',
    params
  })
}

export const findByCas = (params) => {
  return axios({
    url: '/input/findByCas',
    method: 'get',
    params
  })
}
