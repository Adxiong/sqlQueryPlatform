/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:49:01
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 14:55:04
 */

interface ConfigType {
  axios: {
    baseUrl: string
    withCredentials: boolean,
    timeOut: number
  }
}

const config = {
  axios: {
    baseUrl: 'http://localhost:3000',
    withCredentials: true,
    timeOut: 1000
  }
}

export default config