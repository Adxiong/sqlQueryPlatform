/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 20:22:49
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-21 00:33:49
 */

import { FC, useState } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import ProLayout from '@ant-design/pro-layout';
import { Button, Empty, Result } from "antd";
interface Props {

}




const defaultProps = {
  routes: [
    {
      path: '/',
      name: '数据中心'
    },
    {
      path: '/setting',
      name: '设置'
    }
  ]
}
const BaseLayout: FC<Props> = (props) => {
  const [pathname, setPathname] = useState<string>("")
  const navigate = useNavigate()
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        route={defaultProps}
        location={{
          pathname,
        }}
        onMenuHeaderClick={ ()=>{
          navigate('/');
          setPathname('/')
        }}
        menuItemRender={(item, dom) => {      
         return <Link to={item.path!} onClick={() => {setPathname(item.path!)}}>{item.name}</Link>
        }}
      >
        <Outlet/>
      </ProLayout>
      {location.pathname === '/' ? <Navigate replace to='/home' /> : null}
    </div>
  )
}

export default BaseLayout