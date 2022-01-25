/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:31:49
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-26 01:06:00
 */
import { message } from "antd";
import axios, { AxiosInstance, AxiosRequestConfig, Canceler, CancelToken } from "axios";
const CancelToken = axios.CancelToken
let cancel: Canceler

const requestQueue: {
  [propsKey: string]: Canceler
} = {}

const http =  axios.create({
  withCredentials: true,
  timeout: 5000
})

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
  config: any;
  axios: AxiosInstance | null = null ;
  constructor () {
    this.createAxios()
    this.interceptors()
  }
  createAxios () {
    this.axios = axios.create({
      timeout: 6000,
      withCredentials: true
    })
  }
  interceptors () {
    this.axios?.interceptors.request.use( (config: AxiosRequestConfig) => {
      if (requestQueue[config.url as string]) {
        requestQueue[config.url as string]()
      }
      requestQueue[config.url as string] = cancel
      return config
    }, error => {
      return Promise.reject(error)
    })
    this.axios?.interceptors.response.use( response => {
      return response
    }, error => {
      if (error && error.response) {
        const {data, status} = error.response;
        message.error({
          content: `${status}:${data}`,
          duration: 2000,
          top: 10
        })
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    })
  }
  
  async get (url: string, params: any) {
    return http.request({
      url,
      params,
      cancelToken: new CancelToken( c => {
        cancel = c
      } )
    })
  }

  async post (url: string, data: any) {
    return http.request({
      method: 'post',
      url,
      data,
      cancelToken: new CancelToken( c => {
        cancel = c
      })
    })
  }
}

export default new Request()