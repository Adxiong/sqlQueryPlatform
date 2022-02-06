/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-29 13:45:01
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-06 17:19:52
 */
import DatabaseDao from "../dao/database"
import { DatabaseInstance, TableDataInfo, TableInstance } from "../types/database"

class DatabaseService {

  async databaseList(id: string): Promise<DatabaseInstance[]>{
    return await DatabaseDao.databaseList(id)
  }
  
  async queryTableInfoByName(databaseName: string, tableName: string): Promise<TableDataInfo>{
    return await DatabaseDao.queryTableInfoByName(databaseName, tableName)
  }

  async queryData(sessionId: string, selectDatabase: string, sqlContent: string): Promise<any[]> {
    return await DatabaseDao.queryData(sessionId, selectDatabase, sqlContent)
  }
}

export default new DatabaseService()