import { AxiosResponse } from 'axios';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:38:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 18:12:14
 */
import { CreateDatabaseParams, DatabaseInstance } from '../models/reducer/home'
import request from '../utils/request'
import api from "./api"

class HomeService {
  async queryDatabaselist(callback?: (res: DatabaseInstance[] )=>void): Promise<void> {
    const res: DatabaseInstance[] = await request.get(api.home.queryDatabases, {
      method: 'get'
    })
    if (callback){ callback(res)}
  }

  async createDatabase(data: CreateDatabaseParams, callback?: (res: any) => void) {
    const res= await request.post(api.home.createDatabase, {
      data
    })
    if (callback){ callback(res)}
  }

  async deleteDatabase(id: string, callback?: (res: any) => void) {
    const res = await request.delete(api.home.deleteDatabase, id)
    if (callback){ callback(res) }
  }
}

export default new HomeService()