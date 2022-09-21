/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址

export const baseUrl = 'http://39.106.6.27:8084'
//export const baseUrl = 'http://localhost:8084'
// 系统数据备份还原服务器地址
export const backupBaseUrl = 'http://39.106.6.27:8072'
 //export const backupBaseUrl = 'http://localhost:8082'


//docker build -t cetwebrep .
//docker run --name=cetwebcon -d -p 80:8088 cetwebrep


export default {
  baseUrl,
  backupBaseUrl
}
