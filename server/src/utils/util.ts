/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 21:31:24
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-27 22:48:27
 */
import * as _ from "lodash"
import { v4 as uuidv4 } from 'uuid'
class Util {
  toCamelObj (obj: object): object {
    const result = {}
    for (const key in obj) {
      if (_.isFunction(obj[key])) continue
      result[_.cameLCase(key)] = obj[key]
    }
    return result
  }
  uuid (): string {
    return uuidv4()
  }
}


export default new Util()