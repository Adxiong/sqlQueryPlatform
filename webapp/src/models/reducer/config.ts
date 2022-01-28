/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:22
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:32:20
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
  type: string;
  name: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface ConfigStateType {
  databaseList: ConfigInstance[]
}
interface Actios {
  type: string,
  payload: any,
}

const ConfigState: ConfigStateType= {
  databaseList: []
}

export default (state=ConfigState, actions: Actios) => {  
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