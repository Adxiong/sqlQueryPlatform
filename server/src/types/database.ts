/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:51:27
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 14:51:24
 */

export interface DatabaseInstance {
  id: string;
  name: string;
  tables: TableInstance[]
}

export interface TableInstance {
  id: string;
  name: string
}