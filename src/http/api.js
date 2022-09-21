/*
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as menu from './moudules/menu'
import * as input from './moudules/input'
import * as density from  './moudules/density'
import * as parameter from  './moudules/parameter'
import * as output from  './moudules/output'
import * as inputR from  './moudules/inputR'
import * as parametersR from './moudules/parametersR'
import * as resultR from './moudules/resultR'
// 默认全部导出
export default {
  login,
  user,
  menu,
  input,
  density,
  parameter,
  output,
  inputR,
  parametersR,
  resultR,
}
