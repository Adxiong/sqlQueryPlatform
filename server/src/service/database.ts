import { DatabaseInstance, ConfigInstance, CreateConfigParams } from './../types/database';
/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:18:11
 */

import DatabaseDao from "../dao/database";

class DatabaseService {
  async queryConfigList(): Promise<ConfigInstance[]> {
    return await DatabaseDao.queryConfigList()
    
  }

  async createConfig(data: CreateConfigParams): Promise<ConfigInstance> {
    return await DatabaseDao.createConfig(data)
    
  }

  async deleteConfig(id: string): Promise<void> {
    await DatabaseDao.deleteConfig(id)
  }

  async databaseList(id: string): Promise<DatabaseInstance[]>{
    return await DatabaseDao.databaseList(id)
  }
}

export default new DatabaseService()