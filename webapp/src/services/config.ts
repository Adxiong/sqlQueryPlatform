/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:38:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:35:52
 */
import { CreateConfigParams, ConfigInstance } from '../models/reducer/config'
import request from '../utils/request'
import api from "./api"

class ConfigService {
  async query(callback?: (res: ConfigInstance[] )=>void): Promise<void> {
    const res: ConfigInstance[] = await request.get(api.config.query, {
      method: 'get'
    })
    if (callback){ callback(res)}
  }

  async createConfig(data: CreateConfigParams, callback?: (res: any) => void) {
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