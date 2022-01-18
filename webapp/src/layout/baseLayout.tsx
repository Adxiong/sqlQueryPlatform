/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 20:22:49
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-16 20:40:21
 */

import { FC } from "react";
import { Link, Outlet } from "react-router-dom";


interface Props {

}
const BaseLayout: FC<Props> = (props) => {
  return (
    <div>
      <Link to='/home'>首页</Link>
      <Link to='/login'>登陆</Link>
      <Outlet/>
    </div>
  )
}

export default BaseLayout