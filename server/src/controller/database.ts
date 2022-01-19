/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-19 23:43:33
 */

import { Router, Response, Request, NextFunction } from 'express';
import DatabaseService from "../service/database";
import { ApiResult, ResponseStatus} from '../utils/apiResult';

const router =  Router()

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.queryDatabases()
  .then( data => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
}) 


router.get('/createDatabase', (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) {
    res.json(new ApiResult(ResponseStatus.fail, null, '数据不完整'))
    return
  }
  DatabaseService.createDatabase(req.body.name)
  .then( () => {
    res.json(new ApiResult(ResponseStatus.success, null, null))
  })
  .catch(next)
})
export default router