import axios from 'axios';
import { message } from 'antd';

//封装ajax方法
export default function ajax(url, data, method = 'GET') {

  // var ajax = new XMLHttpRequest();
  // 将请求方式转为大写， toUpperCase() 方法用于把字符串转换为大写。语法stringObject.toUpperCase()
  method = method.toUpperCase();
  let promise = null;
  if(method === 'GET') {
    promise = axios.get(url, {
      params: data
    })
  }else {
    promise = axios.post(url,data)
  }

  return promise
    .then(res =>{
      // console.log(data)
      return res.data;
    })
    .catch(err => {
      console.log(err);
      message.error('网络异常，刷新重试',3)
    })

}