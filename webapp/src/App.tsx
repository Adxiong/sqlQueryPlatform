/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:25:04
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-16 20:49:13
 */
import { FC } from 'react'
import { useState } from 'react'
import { useRoutes, Link, Outlet } from 'react-router-dom'
import './App.css'
import Routes from './routes'



const App: FC = () => {
  
  return (
    <div className="App">
      <Routes/>
    </div>
  )
}

export default App
