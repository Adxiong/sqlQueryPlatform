/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-27 20:56:55
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 19:43:49
 */

import { readFile, writeFile } from 'fs'


class FsUtil {
  async ReadFile (path: string): Promise<string> {
    return new Promise( (resolve,reject) => {
      readFile(path, (err, data: Buffer) => {
        if (err) {
          reject(err)
        } else {
          resolve(data.toString())
        }
      }) 
    })
  }

  async WriteFile (path: string, content: string): Promise<void> {
    return new Promise( (resolve, reject) => {
      writeFile(path, content, (err) => {
        if( err) {          
          reject(err) 
        }else {
          resolve()
        }
      })
    })
  }
}

export default new FsUtil()