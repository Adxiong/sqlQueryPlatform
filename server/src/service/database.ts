/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-29 13:45:01
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-01 20:44:36
 */
import DatabaseDao from "../dao/database"
import { DatabaseInstance, TableInstance } from "../types/database"

class DatabaseService {

  async databaseList(id: string): Promise<DatabaseInstance[]>{
    return await DatabaseDao.databaseList(id)
  }
  
  async queryTableInfoByName(databaseName: string, tableName: string): Promise<object>{
    return await DatabaseDao.queryTableInfoByName(databaseName, tableName)
  }
}

export default new DatabaseService()