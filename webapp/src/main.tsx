/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:25:04
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-20 01:09:30
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.less';
import "antd/dist/antd.less";
import App from './App'
import { BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
