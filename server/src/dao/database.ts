/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:15
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-06 17:19:20
 */


import PoolUtil, { ConfigType } from "./pool";
import { DatabaseInstance, TableDataInfo, TableInstance } from "../types/database";
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
  async queryTableInfoByName (databaseName: string, tableName: string): Promise<TableDataInfo> {
    // const useDatabaseSql = 'use ?;'
    const sql = `select * from ${databaseName}.${tableName};`
    const descSql = `desc ${databaseName}.${tableName};`
    // await this.pool.query(useDatabaseSql, [databaseName])
    const tableData = await this.pool.query(sql, [])
    const descData = await this.pool.query(descSql, [])
    const data: TableDataInfo = {
      tableData,
      descData
    }
    return data
  }


  async queryData(sessionId: string,  selectDatabase: string, sqlContent: string): Promise<any[]> {
    const configs = JSON.parse(await fsutils.ReadFile(config.databaseFilePath))
    const configInfo: ConfigInstance = configs.filter( item => item.id == sessionId)[0]
    const pool = new PoolUtil({
      host: configInfo.host,
      port: configInfo.port,
      user: configInfo.user,
      password: configInfo.password,
      database: selectDatabase
    } as ConfigType)
    return await pool.query(sqlContent, [])
  }
}

export default new DatabaseDao()