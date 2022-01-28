/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:51:27
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 17:41:17
 */

export interface DatabaseInstance {
  id: string;
  type: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface CreateDatabaseParams {
  type: string
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}