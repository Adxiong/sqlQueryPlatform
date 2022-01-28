/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 14:12:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:06:03
 */

import * as path from 'path'
interface Config {
  databaseFilePath: string
  port: number,
}

const config: Config = {
  databaseFilePath: path.resolve(__dirname, '../file/databaseList.json'),
  port: 3000,
}

export default config 