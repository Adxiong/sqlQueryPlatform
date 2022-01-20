import { Outlet, useRoutes } from 'react-router-dom';
/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:28:50
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-20 21:53:46
 */



import { lazy, FC, Suspense } from "react"
import { RouteObject  } from 'react-router-dom'
import { Link } from 'react-router-dom';
import  BaseLayout from "../layout/baseLayout"
import Home from '../pages/home/home'
import Login from '../pages/login/login'

export interface RoutesType  {
  path: string;
  element: JSX.Element;
  children?: RoutesType[];

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
        path: "/login",
        element: <Login/>,
      }
    ]
  }
]

const GetRoutes: FC = () => {
  return useRoutes(routes)
}

export default GetRoutes