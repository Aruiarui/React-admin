import axios from 'axios';
import { message } from "antd";

export default function ajax(url, data, method = 'GET') {
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