/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:37:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 14:50:33
 */

export default {
  config: {
    query: '/api/config/list',
    createConfig: '/api/config/createConfig',
    deleteConfig: '/api/config/deleteConfig',
    updateConfig: '/api/config/updateConfig'
  },
  database: {
    query: '/api/database/list',
    queryTableData: '/api/database/queryTableData',
    queryData:  '/api/database/queryData'
  }
}
