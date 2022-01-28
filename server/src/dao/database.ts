/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 20:31:05
 */


import pool from "./pool";
import { DatabaseInstance } from "../types/database";
import fsutils from "../utils/fsutils";
import logger from "../utils/logger";
import config from '../config';
import util from '../utils/util';
import { CreateDatabaseParams } from './../types/database';
import * as jsBeautify from 'js-beautify'
class DatabaseDao {
 async queryDatabaseList (): Promise<DatabaseInstance[]> {
  // const sql = 'show databases'
  // const data =  await pool.query(sql, [])  
  // const result = []
  // data.forEach( (item: { Database: string },index) => {
  //   result.push({
  //     id: index,
  //     name: item.Database
  //   })
  // })  
  try {
    const readRes = await fsutils.ReadFile(config.databaseFilePath)
    let jsonRes = []
    if (readRes!="") {
      jsonRes = JSON.parse(readRes)
    }
    return jsonRes
  } catch( e ){
    logger.info(e)
    throw(e)
  }
 }

 async createDatabase (data: CreateDatabaseParams): Promise<DatabaseInstance> {
   try {
    const readRes = await fsutils.ReadFile(config.databaseFilePath)
    let jsonRes = []
    if (readRes!="") {
      jsonRes = JSON.parse(readRes)
    }
    const params = {
      id: util.uuid(),
      type: data.type,
      name: data.name,
      host: data.host,
      port: data.port,
      user: data.user,
      password: data.password
    }
    jsonRes.push(params)    
    await fsutils.WriteFile(config.databaseFilePath, jsBeautify(JSON.stringify(jsonRes)))    
    return params
  } catch (e) {
      logger.info(e)
      throw(e)
    }
   
 }

 async deleteDatabase (id: string): Promise<void> {
  try {
    const readRes = await fsutils.ReadFile(config.databaseFilePath)
    let jsonRes = []
    if (readRes!="") {
      jsonRes = JSON.parse(readRes)
    }
    
    const newJson = jsonRes.filter((item: DatabaseInstance) => item.id != id)
    await fsutils.WriteFile(config.databaseFilePath, jsBeautify(JSON.stringify(newJson)))    
  } catch (e) {
      logger.info(e)
      throw(e)
    }
 }

 async useDatabase (name: string): Promise<void> {
   const sql = 'use ?'
   await pool.query(sql, [name])
 }
}

export default new DatabaseDao()