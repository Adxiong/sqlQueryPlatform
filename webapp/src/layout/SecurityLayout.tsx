/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 01:19:38
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 01:24:20
 */
import { FC } from "react";
import { Outlet } from "react-router-dom";

interface Props {

}
const SecurityLayout: FC = (props) => {
  return (
    <Outlet/>
  )
}

export default SecurityLayout