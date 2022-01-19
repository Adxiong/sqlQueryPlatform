/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 10:16:58
 */

import DatabaseDao from "../dao/database";

class DatabaseService {
 async queryDatabases(): Promise<object> {
  const databases = await DatabaseDao.queryDatabases()
  return databases
 }

 async createDatabase(): Promise<boolean> {
   const result = await DatabaseDao.createDatabase()
   return result
 }

}

export default new DatabaseService()