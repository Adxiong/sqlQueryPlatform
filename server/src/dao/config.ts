/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:22:14
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:46:31
 */
import { ConfigInstance, CreateConfigParams } from "../types/config";
import fsutils from "../utils/fsutils";
import logger from "../utils/logger";
import config from '../config';
import util from '../utils/util';
import * as jsBeautify from 'js-beautify'


class ConfigDao {
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
}

export default new ConfigDao()