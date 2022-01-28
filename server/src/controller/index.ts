/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:39:03
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:21:25
 */

import { Router } from 'express';
import database from "./database";
import config from "./config";

const router = Router()

router.use('/config', config)
router.use('/database', database)


export default router