/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:31:06
 */


import pool from "./pool";

class DatabaseDao {
 async queryDatabases (): Promise<object> {
  const sql = 'show databases'
  return await pool.query(sql, [])
 }
}

export default new DatabaseDao()