/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 00:11:18
 */

import configStore, { ConfigStateType } from "./config"
import { combineReducers } from 'redux'
import { DatabaseStateType } from './database';


export interface defaultStore {
  configStore: ConfigStateType
  databaseStore: DatabaseStateType
}

export default combineReducers({
  configStore
})