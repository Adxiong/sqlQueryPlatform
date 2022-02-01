/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:51:27
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-02 01:41:17
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

export interface TableDataInfo {
  tableData: any[],
  descData: any[]
}