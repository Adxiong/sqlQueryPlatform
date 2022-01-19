/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-19 23:24:24
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 23:37:52
 */


enum ResponseStatus {
  success = 200,
  fail = 500,
}

/**
 * 接口返回json统一结构
 */

class ApiResult {
  status: ResponseStatus
  data: string | object | null
  msg?: string

  constructor (status: ResponseStatus, data?: string | object | null, message?: string) {
    this.status = status
    this.data = data
    this.msg = message
  }
}

export {
  ApiResult,
  ResponseStatus
}