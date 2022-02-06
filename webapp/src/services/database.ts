import { log } from 'console';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:25:36
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-06 15:43:44
 */

import request from "../utils/request"
import api from './api';

class DatabaseService {
  async query(id: string, callback?: (res: any) => void) {
    const res = await request.post(api.database.query, {id})
    if (callback){ callback(res)}
  }

  async queryTableData(data: {databaseName: string, tableName: string}) {
    const res = await request.post(api.database.queryTableData, {
      databaseName: data.databaseName,
      tableName: data.tableName
    })    
    return res
  }

  async queryData( data: {
    sqlContent: string;
    selectDatabase: string
  }){
    const {sqlContent, selectDatabase} = data
    const res = await request.post(api.database.queryData, {
      sqlContent,
      selectDatabase
    })
    return res
  }
}

export default new DatabaseService()