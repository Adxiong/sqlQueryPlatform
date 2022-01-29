/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-29 13:45:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:45:10
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