/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-12 17:25:04
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-27 01:36:02
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.less';
import "antd/dist/antd.less";
import App from './App'
import { BrowserRouter as Router} from "react-router-dom"
import store from "./models/store/index"
import { Provider } from 'react-redux';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App /> 
    </Provider>
  </Router>,
  document.getElementById('root')
)
