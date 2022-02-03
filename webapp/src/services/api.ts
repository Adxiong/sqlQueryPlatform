/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 14:37:59
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-04 02:02:32
 */

export default {
  config: {
    query: '/api/config/list',
    createConfig: '/api/config/createConfig',
    deleteConfig: '/api/config/deleteConfig',
  },
  database: {
    query: '/api/database/list',
    queryTableData: '/api/database/queryTableData',
    queryData:  '/api/database/queryData'
  }
}
