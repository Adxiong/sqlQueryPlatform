import { log } from 'console';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:25:36
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-31 19:10:14
 */

import request from "../utils/request"
import api from './api';

class DatabaseService {
  async query(id: string, callback?: (res: any) => void) {
    const res = await request.post(api.database.query, {id})
    if (callback){ callback(res)}
  }

  async queryTableData(data: {databaseName: string, tableName: string}, callback?: (res: any) => void) {
    const res = await request.post(api.database.queryTableData, {
      databaseName: data.databaseName,
      tableName: data.tableName
    })    
    // if (callback){ callback(res)}
    return res
  }
}

export default new DatabaseService()