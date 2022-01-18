/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 14:12:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:18:46
 */

interface Config {
  port: number,
  database: {
    host: string,
    port: number,
    user: string,
    password: string
  }
}

const config: Config = {
  port: 3000,
  database: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: "123456"
  }
}

export default config 