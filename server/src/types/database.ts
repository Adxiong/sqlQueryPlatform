/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:51:27
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:43:56
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

export interface TableInstance {
  id: string;
  name: string
}