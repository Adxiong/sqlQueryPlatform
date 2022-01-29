/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-30 03:06:02
 */


import PoolUtil, { ConfigType } from "./pool";
import { DatabaseInstance, TableInstance } from "../types/database";
import fsutils from "../utils/fsutils";
import logger from "../utils/logger";
import config from '../config';
import util from '../utils/util';
import * as jsBeautify from 'js-beautify'
import { ConfigInstance } from "../types/config";
class DatabaseDao {
  pool: PoolUtil

  async databaseList(id: string): Promise<DatabaseInstance[]> {
    const configs = JSON.parse(await fsutils.ReadFile(config.databaseFilePath))
    const configInfo: ConfigInstance = configs.filter( item => item.id == id)[0]
    this.pool = new PoolUtil({
      host: configInfo.host,
      port: configInfo.port,
      user: configInfo.user,
      password: configInfo.password
    } as ConfigType)
    const sql = 'show databases;'
    const data: {Database: string}[] =  await this.pool.query(sql, [])  

    const result = []
    for (const item of data) {
      const queryTables = `show tables from ${item.Database};`
      const tables: TableInstance[] = await this.pool.query(queryTables, [])
      const tablesData = []
      for( const table of tables) {
        tablesData.push({
          id: util.uuid(),
          name: table[Object.keys(table)[0]]
        })
      }
      result.push({
        id: util.uuid(),
        name: item.Database,
        tables: tablesData
      })
    }

    return result
  }

  /**
   * 默认查询所有
   * @param name 
   * @returns 
   */
  async queryTableInfoByName (databaseName: string, tableName: string): Promise<any[]> {
    // const useDatabaseSql = 'use ?;'
    const sql = `select * from ${databaseName}.${tableName}`
    // await this.pool.query(useDatabaseSql, [databaseName])
    const data = await this.pool.query(sql, [])
    return data
  }

  //查询表结构
  async descTableInfoByName (databaseName: string, tableName: string): Promise<any[]> {
    const sql = `desc ${databaseName}.${tableName}`
    const data = await this.pool.query(sql, [databaseName, tableName])
    return data
  } 

  //删除表
  async deleteTableByName (databaseName: string, tableName: string): Promise<void> {
    const sql = ''
  }

}

export default new DatabaseDao()