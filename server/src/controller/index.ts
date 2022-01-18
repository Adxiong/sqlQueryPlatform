/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:39:03
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-18 23:39:04
 */

import { Router } from 'express';
import database from "./database";

const router = Router()

router.use('/database', database)

export default router