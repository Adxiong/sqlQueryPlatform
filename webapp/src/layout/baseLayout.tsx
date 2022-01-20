/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 20:22:49
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-20 22:02:46
 */

import { FC, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ProLayout from '@ant-design/pro-layout';
interface Props {

}
const defaultProps = {
  routes: [
    {
      path: '/',
      name: '主面板'
    },
    {
      path: '/login',
      name: '用户中心'
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
    </div>
  )
}

export default BaseLayout