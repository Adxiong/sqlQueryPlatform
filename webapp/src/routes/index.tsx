/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:28:50
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-25 00:58:15
 */


import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { lazy, FC, Suspense } from "react"
import  BaseLayout from "../layout/BaseLayout";
import SecurityLayout from '../layout/SecurityLayout';
import Home from '../pages/home/home'
import Setting from '../pages/setting/setting'
import Details from '../pages/home/details';
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
    element: <BaseLayout/>,
    children: [
      {
        path: '/home',
        element: <Navigate replace to="/home/list"/>
      },
      {
        path: '/home/list',
        element: <Home/>
      },
      {
        path: '/home/details',
        element: <Details />
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