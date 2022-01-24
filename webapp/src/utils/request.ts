/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:31:49
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 16:19:10
 */
import axios from "axios";
import config from "../config/config";


const http =  axios.create(config.axios)

http.interceptors.request.use( config => {
  return config
}, err => {
  console.log(err);
  return Promise.reject(err)
})

http.interceptors.response.use( response => {
  return response
}, err => {
  return Promise.resolve(err.response)
})

class Request {

  async get (url: string, params: any) {

  }
}

export default new Request()