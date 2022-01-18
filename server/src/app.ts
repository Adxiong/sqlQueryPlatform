/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 14:11:57
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:40:29
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


app.use('/api', api)

app.listen( config.port, () => {
  logger.info(`listen on port ${config.port};\n click http://localhost:${config.port} to visit server;`)
} )