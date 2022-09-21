import axios from '../axios'

/*
 * 系统登录模块
 */

// 登录
export const login = data => {
    return axios({
        url: 'login',
        method: 'post',
        data
    })
};

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'get'
    })
};


// 查找用户信息
export const sendEmail = (params) => {
    return axios({
        url: 'sendEmail',
        method: 'get',
        params
    })
};
// 发送重置邮件
export const resetPassword = (data) => {
    return axios({
        url: 'resetpassword',
        method: 'post',
        data
    })
}
// 查找用户信息
export const verifyCode = (params) => {
    return axios({
        url: 'verifyCode',
        method: 'get',
        params
    })
}
