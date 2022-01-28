/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:22
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 22:38:00
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
  type: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface TableInstance {
  id: string;
  name: string;
}
export interface HomeSateType {
  databaseList: DatabaseInstance[]
}
interface Actios {
  type: string,
  payload: any,
}

const HomeState: HomeSateType= {
  databaseList: []
}

export default (state=HomeState, actions: Actios) => {  
  switch(actions.type) {
    case "setDatabaseList":
      return {
        ...state,
        databaseList: actions.payload
      } 
    case "deleteDatabase":
      state.databaseList = state.databaseList.filter(item => item.id != actions.payload)
      return {
        ...state
      }
    case "addDatabase":
      state.databaseList.push(actions.payload)
      return {
        ...state
      }
    default: 
      return state
  }
}