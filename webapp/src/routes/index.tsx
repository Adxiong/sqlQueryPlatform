import { Navigate, Outlet, useRoutes } from 'react-router-dom';
/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:28:50
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-21 00:33:56
 */



import { lazy, FC, Suspense } from "react"
import { RouteObject  } from 'react-router-dom'
import { Link } from 'react-router-dom';
import  BaseLayout from "../layout/baseLayout"
import Home from '../pages/home/home'
import Setting from '../pages/setting/setting'
import { Button, Result } from 'antd';

export interface RoutesType  {
  path: string;
  element: JSX.Element;
  children?: RoutesType[];

}
const NotFound: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">Back Home</Button>
      }
    >

    </Result>
  )
}
export const routes: RoutesType[]= [
  {
    path: '/',
    element: (
      <Suspense fallback={<>数据加载中。。。</>}>
        <BaseLayout/>
      </Suspense>
    ),
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: "/setting",
        element: <Setting/>,
      },
      {
        path: '/404',
        element: <NotFound/>
      },
    ]
  },
  {
    path: '*',
    element: <Navigate replace to="/404" />
  }
]

const GetRoutes: FC = () => {
  return useRoutes(routes)
}

export default GetRoutes