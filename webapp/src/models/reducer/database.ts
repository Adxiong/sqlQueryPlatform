/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:30:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 00:08:08
 */

import { Actions } from './commons';

export interface DatabaseInstance {
  id: string;
  name: string;
}


export interface DatabaseStateType {
  databaseList: DatabaseInstance[]
}

const State: DatabaseStateType = {
  databaseList: []
}

export default (state=State, actions: Actions) => {
  switch(actions.type) {
    case "setDatabaseList":
      return {
        ...state,
        databaseList: actions.payload
      }
    case "rmDatabase":
      state.databaseList = state.databaseList.filter(item => item.id != actions.payload)
      return {
        ...state
      }
    default:
      return state
  }
}