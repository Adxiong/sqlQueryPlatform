/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:30:16
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-02 01:49:27
 */

import { Actions } from './commons';

export interface DatabaseInstance {
  id: string;
  name: string;
  tables: TableInstance[]
}

export interface TableInstance {
  id: string;
  name: string
}

export interface TableDataInfoType {
  tableData: any[],
  descData: any[]
}

export interface DatabaseStateType {
  databaseList: DatabaseInstance[],
  tableData: TableDataInfoType[]
}

const State: DatabaseStateType = {
  databaseList: [],
  tableData: []
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
    case "setTableData":
      return {
        ...state,
        tableData: actions.payload
      }
    default:
      return state
  }
}