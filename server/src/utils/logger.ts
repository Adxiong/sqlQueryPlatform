/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 21:31:44
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 00:01:27
 */
import * as log4js from 'log4js';
import * as path from 'path';

log4js.configure( {
  appenders: {
    console: {
      type: "console"
    },
    file: {
      type: 'dateFile',
      filename: path.resolve(__dirname, '../../logs/sqlQueryPlatform.log'),
      alwaysIncludePattern: true,
      daysToKeep: 5
    }
  },
  categories: {
    default: {
      appenders: ['console','file'],
      level: 'info'
    }
  },
  pm2: true
})

const logger = log4js.getLogger()
export default logger