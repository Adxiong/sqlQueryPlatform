/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:32:00
 */

import configStore, { ConfigStateType } from "./config"
import { combineReducers } from 'redux'


export interface defaultStore {
  configStore: ConfigStateType
}

export default combineReducers({
  configStore
})