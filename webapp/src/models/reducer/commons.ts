/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:57:46
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-30 19:59:03
 */

export interface Actions {
  type: string,
  payload: any,
}

export interface TreeDataType {
  key: string;
  title: string;
  children?: LeafDataType[]
}

export interface LeafDataType {
  key: string;
  title: string;
  isLeaf: boolean;
  parentName: string;
}