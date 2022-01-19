/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-20 00:07:32
 */

import DatabaseDao from "../dao/database";

class DatabaseService {
  async queryDatabases(): Promise<object> {
    const databases = await DatabaseDao.queryDatabases()
    return databases
  }

  async createDatabase(name: string): Promise<void> {
    DatabaseDao.createDatabase(name)
  }
  
  async useDatabase(name: string): Promise<void> {
    DatabaseDao.useDatabase(name)
  }
}

export default new DatabaseService()