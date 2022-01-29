/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:46:42
 */


import PoolUtil, { ConfigType } from "./pool";
import { DatabaseInstance } from "../types/database";
import fsutils from "../utils/fsutils";
import logger from "../utils/logger";
import config from '../config';
import util from '../utils/util';
import * as jsBeautify from 'js-beautify'
import { ConfigInstance } from "../types/config";
class DatabaseDao {
  pool: PoolUtil
  async databaseList(id: string): Promise<DatabaseInstance[]> {

    const configs = JSON.parse(await fsutils.ReadFile(config.databaseFilePath))
    const configInfo: ConfigInstance = configs.filter( item => item.id == id)[0]
    this.pool = new PoolUtil({
      host: configInfo.host,
      port: configInfo.port,
      user: configInfo.user,
      password: configInfo.password
    } as ConfigType)
    const sql = 'show databases;'
    const data =  await this.pool.query(sql, [])  
    console.log(data);
    
    const result = []
    data.forEach( (item: { Database: string },index) => {
      result.push({
        id: index,
        name: item.Database
      })
    })  
    return result
  }
}

export default new DatabaseDao()