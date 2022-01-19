/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 10:16:00
 */


import pool from "./pool";
import { DatabaseBaseType } from "../types/database";
class DatabaseDao {
 async queryDatabases (): Promise<DatabaseBaseType[]> {
  const sql = 'show databases'
  const data =  await pool.query(sql, [])  
  const result = []
  data.forEach( (item: { Database: string },index) => {
    result.push({
      id: index,
      name: item.Database
    })
  })  
  return result
 }

 async createDatabase (): Promise<boolean> {
  const sql = 'create database ?;'
  const result = await pool.query(sql, [])
  return result
 }
}

export default new DatabaseDao()