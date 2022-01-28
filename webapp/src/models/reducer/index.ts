/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:10
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 21:29:36
 */

import HomeStore, { HomeSateType } from "./home"
import { combineReducers } from 'redux'


export interface defaultStore {
  HomeStore: HomeSateType
}

export default combineReducers({
  HomeStore
})