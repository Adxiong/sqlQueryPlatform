/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:38:12
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 16:19:17
 */
import requert from '../utils/request'
import api from "./api"

class HomeService {
  async queryDatabaselist() {
    return requert.get(api.home.queryDatabases, {
      method: 'get'
    })
  }
}

export default new HomeService()