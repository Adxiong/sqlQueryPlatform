
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:22
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 16:30:05
 */

import { Actions } from "./commons"

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
  configList: ConfigInstance[]
}

const State: ConfigStateType= {
  configList: []
}

export default (state=State, actions: Actions) => {  
  switch(actions.type) {
    case "setConfigList":
      return {
        ...state,
        configList: actions.payload
      } 
    case "updateConfig":
      state.configList.map( (item,index) =>  {
        if (item.id == actions.payload.id) {
          state.configList[index] = actions.payload
        }
      })
      return {
        ...state
      }
    case "deleteConfig":
      state.configList = state.configList.filter(item => item.id != actions.payload)
      return {
        ...state
      }
    case "addConfig":
      state.configList.push(actions.payload)
      return {
        ...state
      }
    default: 
      return state
  }
}