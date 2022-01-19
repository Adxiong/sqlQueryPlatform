/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 10:14:12
 */

import { Router, Response, Request, NextFunction } from 'express';
import DatabaseService from "../service/database";

const router =  Router()

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.queryDatabases()
  .then( data => {
    res.json(data)
  })
  .catch(next)
}) 


router.get('/createDatabase', (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.createDatabase()
  .then( () => {
    res.json()
  })
  .catch(next)
})
export default router