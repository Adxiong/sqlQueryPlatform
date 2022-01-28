import { AxiosResponse } from 'axios';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:38:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:28:23
 */
import { CreateDatabaseParams, DatabaseInstance } from '../models/reducer/home'
import request from '../utils/request'
import api from "./api"

class ConfigService {
  async query(callback?: (res: DatabaseInstance[] )=>void): Promise<void> {
    const res: DatabaseInstance[] = await request.get(api.config.query, {
      method: 'get'
    })
    if (callback){ callback(res)}
  }

  async createConfig(data: CreateDatabaseParams, callback?: (res: any) => void) {
    const res= await request.post(api.config.createConfig, {
      data
    })
    if (callback){ callback(res)}
  }

  async deleteConfig(id: string, callback?: (res: any) => void) {
    const res = await request.delete(api.config.deleteConfig, id)
    if (callback){ callback(res) }
  }
}

export default new ConfigService()