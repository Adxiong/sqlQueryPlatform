/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-27 20:56:55
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-27 21:44:22
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

  async WriteFile (path: string, content: string): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      writeFile(path, content, (err,) => {
        if( err) {
          reject(err) 
        } else {
          resolve(true)
        }
      })
    })
  }
}

export default new FsUtil()