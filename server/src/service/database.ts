import { CreateDatabaseParams, DatabaseInstance } from './../types/database';
/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 20:31:25
 */

import DatabaseDao from "../dao/database";

class DatabaseService {
  async queryDatabaseList(): Promise<DatabaseInstance[]> {
    return await DatabaseDao.queryDatabaseList()
    
  }

  async createDatabase(data: CreateDatabaseParams): Promise<DatabaseInstance> {
    return await DatabaseDao.createDatabase(data)
    
  }
  
  async useDatabase(name: string): Promise<void> {
    await DatabaseDao.useDatabase(name)
  }
  
  async deleteDatabase(id: string): Promise<void> {
    await DatabaseDao.deleteDatabase(id)
  }
}

export default new DatabaseService()