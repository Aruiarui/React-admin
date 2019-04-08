//配置服务器代理模式， 完成访问网页

import ajax from './ajax';
import jsonp from 'jsonp'

//区分开发和生产环境， NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的
const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:5000';

//请求登录函数
export const reqLogin = (username, password) => ajax(prefix + '/login' ,{username, password}, 'POST')

//请求天气参数
// export function reqWeather(city) {
//   const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  
//   return new Promise((resolve, reject) => {
//     jsonp(url, (error, data) => {
//       if(!error) {
//         const { dayPictureUrl, weather } = data.results[0].weather_data[0]
//         resolve({weatherImg:dayPictureUrl, weather})
//       }else {
//         reject('网络不稳定，获取天气信息失败')
//       }
//     })
//   })
// }

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      (err, data) => {
        if (!err) {
          const { dayPictureUrl, weather } = data.results[0].weather_data[0];
          resolve({weather, weatherImg: dayPictureUrl});
        } else {
          // 提示错误
          reject('请求失败，网络不稳定~');
        }
      }
    )
  })
}

//请求分类列表数据
export const reqGetCategories = (parentId) => ajax(prefix + '/manage/category/list', {parentId});

//添加分类函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add', {parentId, categoryName}, 'POST');

//请求修改分类名称
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax(prefix + '/manage/category/update', {categoryId, categoryName}, 'POST'); 
export const reqGetProducts = (pageName, pageSize) => ajax(prefix + '/manage/product/list', {pageName, pageSize}); 
