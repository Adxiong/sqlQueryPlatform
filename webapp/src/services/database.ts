/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:25:36
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:27:33
 */

import request from "../utils/request"
import api from './api';

class DatabaseService {
  async query(id: string, callback?: (res: any) => void) {
    const res = await request.post(api.database.query, {id})
    if (callback){ callback(res)}
  }
}

export default new DatabaseService()