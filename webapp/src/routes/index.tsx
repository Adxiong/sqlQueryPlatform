import { Outlet, useRoutes } from 'react-router-dom';
/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:28:50
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-16 20:59:23
 */



import { lazy, FC, Suspense } from "react"
import { RouteObject } from 'react-router-dom'
import { Link } from 'react-router-dom';
import  BaseLayout from "../layout/baseLayout"
// import Home from '../pages/home/home'
import Login from '../pages/login/login'

const Home = lazy( () => import('../pages/home/home'))

const GetRoutes: FC = () => {
  const routes= [
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
  return useRoutes(routes)
}

export default GetRoutes