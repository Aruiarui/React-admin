//配置服务器代理模式， 完成访问网页

import ajax from './ajax';

//区分开发和生产环境， NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

//请求登录函数
export const reqLogin = (username, password) => ajax(prefix + '/login' ,{username, password}, 'POST')