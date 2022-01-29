/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:16:47
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-30 03:15:46
 */
import * as mysql from "mysql";
import logger from "../utils/logger";
import util from "../utils/util";

export interface ConfigType {
  host: string;
  port: number;
  user: string;
  password: string;
}

function formatRes <T>(sql: string, res: any): T[] {
  if (/^(\s*select)/i.test(sql)) {
    const list = []
    res.forEach((item: object) => {
      list.push(util.toCamelObj(item))
    })
    return list
  } else {
    return res
  }
}

class PoolUtil {
  pool: any;
  constructor(config: ConfigType) {
    this.pool = mysql.createPool(config)
  }
  query<T> (sql: string, params?: any[]): Promise<T[]> {   
    logger.info('sql query', sql, params)
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          logger.error('执行sql错误', err.sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  write (sql: string, params?: any[]): Promise<mysql.OkPacket> {
    logger.info('sql insert: ', sql, params)
    return new Promise((resolve, reject) => {
      this.pool.query(sql, params, (err, result) => {
        if (err) {
          logger.error('执行insert语句错误', err.sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  beginTransaction (): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection: mysql.PoolConnection) => {
        if (err) {
          logger.error('获取数据库连接失败', err)
          reject(err)
          return
        }
        connection.beginTransaction(error => {
          if (error) {
            logger.error('开启事务失败', error)
            reject(error)
          } else {
            resolve(connection)
          }
        })
      })
    })
  }
  queryInTransaction<T> (connect: mysql.PoolConnection, sql: string, params?: Array<string|number>): Promise<T[]> {
    return new Promise((resolve, reject) => {
      logger.info('query in transaction', sql, params)
      connect.query(sql, params, (err, results) => {
        if (err) {
          logger.error('事务中执行sql失败', err.sql)
          reject(err)
        } else {
          resolve(formatRes(sql, results))
        }
      })
    })
  }
  writeInTransaction (connect: mysql.PoolConnection, sql: string, params?: any[]): Promise<mysql.OkPacket> {
    return new Promise((resolve, reject) => {
      logger.info('insert in transaction', sql, params)
      connect.query(sql, params, (err, result) => {
        if (err) {
          logger.error('事务中执行sql失败', err.sql)
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
  commit (connection: mysql.PoolConnection): Promise<void> {
    return new Promise((resolve, reject) => {
      connection.commit(err => {
        if (err) {
          logger.error('提交事务失败', err)
          reject(err)
        } else {
          connection.release()
          resolve()
        }
      })
    })
  }
  rollback (connection: mysql.PoolConnection): void {
    connection.rollback(() => {
      connection.release()
    })
  }
}
export default PoolUtil