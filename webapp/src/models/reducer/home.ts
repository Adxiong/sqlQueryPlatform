/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-26 20:27:22
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-26 20:29:22
 */

interface HomeSateType {

}
interface Actios {
  types: string,
  data: any
}

const HomeState: HomeSateType= {

}

export default (state=HomeState, actions: Actios) => {
  switch(actions.types) {
    default: 
      return state
  }
}