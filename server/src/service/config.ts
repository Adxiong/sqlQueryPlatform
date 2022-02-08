/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:28:07
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:49:18
 */
import { ConfigInstance, CreateConfigParams } from '../types/config';

import ConfigDao from "../dao/config";

class ConfigService {
  async queryConfigList(): Promise<ConfigInstance[]> {
    return await ConfigDao.queryConfigList()
  }

  async createConfig(data: CreateConfigParams): Promise<ConfigInstance> {
    return await ConfigDao.createConfig(data)
  }

  async updateConfig(data: ConfigInstance): Promise<void> {
    return await ConfigDao.updateConfig(data)
  }

  async deleteConfig(id: string): Promise<void> {
    await ConfigDao.deleteConfig(id)
  }
}

export default new ConfigService()