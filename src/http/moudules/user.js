import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const add = (data) => {
    return axios({
        url: '/user/',
        method: 'post',
        data
    })
}
// 保存
export const update = (data) => {
    return axios({
        url: '/user/',
        method: 'put',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/',
        method: 'delete',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/user/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}

export const changePassword = (data) => {
  return axios({
    url: '/user/changePassword',
    method: 'post',
    data
  })
}
export const getCurrentUser = () => {
    return axios({
      url: '/user/getcurrentuser',
      method: 'get'

    })

};

export function upload (data)  {
  return axios({
    url: '/user/upload',
    method: 'post',
    data:data
  })
}

export function downloadDemo (params)  {
  return axios({
    url: '/user/downloaddemo',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
export function downloadhelp (params)  {
    return axios({
        url: '/user/downloadhelp',
        method: 'get',
        params,
        responseType: 'blob'
    })
}
export function downloadProve (params)  {
  return axios({
    url: '/user/downloadprove',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export function downloadPersonal (params)  {
  return axios({
    url: '/user/downloadPersonal',
    method: 'get',
    params,
    responseType: 'blob'
  })
}
export function sendEmail (data)  {
  return axios({
    url: '/contract/sendemail',
    method: 'post',
    data,
  })
}


export const checkEmailExist = (params) => {
  return axios({
    url: '/user/checkemailexist',
    method: 'get',
    params
  })

};
export const checkUsernameExist = (params) => {
  return axios({
    url: '/user/checkusernameexist',
    method: 'get',
    params
  })

};