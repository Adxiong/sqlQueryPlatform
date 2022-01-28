/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:51:27
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:14:25
 */

export interface ConfigInstance {
  id: string;
  type: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface CreateConfigParams {
  type: string
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface DatabaseInstance {
  id: string;
  name: string;
}