/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:32:48
 */

import DatabaseDao from "../dao/database";

class DatabaseService {
 async queryDatabases(): Promise<object> {
  const databases = await DatabaseDao.queryDatabases()
  return databases
 }
}

export default new DatabaseService()