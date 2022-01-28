/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 14:11:57
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 03:46:31
 */
import * as express from 'express';
import config from './config';
import logger from "./utils/logger";
import * as cookieParser from "cookie-parser";
import * as bodyParser from 'body-parser';
import * as session from "express-session";
import pool from './dao/pool';
import api from './controller'

const app = express()
// 跨域设置
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers'])
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Methods', req.method)//设置方法
  if (req.method === 'OPTIONS') {
    logger.info('got request in cross origin(OPTIONS): ', req.path)
    res.sendStatus(204) // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  } else {
    logger.info('got request in cross origin: ', req.path)
    next()
  }
})

// app.use(cookieParser)
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/api', api)

app.listen( config.port, () => {
  logger.info(`listen on port ${config.port};\n click http://localhost:${config.port} to visit server;`)
} )