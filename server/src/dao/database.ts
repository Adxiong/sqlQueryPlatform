/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-20 00:07:27
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

 async createDatabase (name: string): Promise<void> {
  const sql = 'create database ?;'
  await pool.query(sql, [name])
 }

 async useDatabase (name: string): Promise<void> {
   const sql = 'use ?'
   await pool.query(sql, [name])
 }
}

export default new DatabaseDao()