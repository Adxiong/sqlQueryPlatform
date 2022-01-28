/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:19:14
 */


import PoolUtil, { ConfigType } from "./pool";
import { DatabaseInstance, ConfigInstance, CreateConfigParams } from "../types/database";
import fsutils from "../utils/fsutils";
import logger from "../utils/logger";
import config from '../config';
import util from '../utils/util';
import * as jsBeautify from 'js-beautify'
class DatabaseDao {
  pool: PoolUtil
  async queryConfigList (): Promise<ConfigInstance[]> {
    try {
      const readRes = await fsutils.ReadFile(config.databaseFilePath)
      let jsonRes = []
      if (readRes!="") {
        jsonRes = JSON.parse(readRes)
      }
      return jsonRes
    } catch( e ){
      logger.info(e)
      throw(e)
    }
  }

  async createConfig (data: CreateConfigParams): Promise<ConfigInstance> {
    try {
      const readRes = await fsutils.ReadFile(config.databaseFilePath)
      let jsonRes = []
      if (readRes!="") {
        jsonRes = JSON.parse(readRes)
      }
      const params = {
        id: util.uuid(),
        type: data.type,
        name: data.name,
        host: data.host,
        port: data.port,
        user: data.user,
        password: data.password
      }
      jsonRes.push(params)    
      await fsutils.WriteFile(config.databaseFilePath, jsBeautify(JSON.stringify(jsonRes)))    
      return params
    } catch (e) {
        logger.info(e)
        throw(e)
      }
    
  }

  async deleteConfig (id: string): Promise<void> {
    try {
      const readRes = await fsutils.ReadFile(config.databaseFilePath)
      let jsonRes = []
      if (readRes!="") {
        jsonRes = JSON.parse(readRes)
      }
      
      const newJson = jsonRes.filter((item: ConfigInstance) => item.id != id)
      await fsutils.WriteFile(config.databaseFilePath, jsBeautify(JSON.stringify(newJson)))    
    } catch (e) {
        logger.info(e)
        throw(e)
      }
  }

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