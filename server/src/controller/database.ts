/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 13:46:16
 */
import { DatabaseInstance, TableInstance } from './../types/database';
import { Router, Response, Request, NextFunction } from 'express';
import DatabaseService from "../service/database";
import { ApiResult, ResponseStatus} from '../utils/apiResult';

const router =  Router()

router.post('/list', (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.id) {
    res.json(new ApiResult(ResponseStatus.fail,"", "id为空！"))
    return
  }
  DatabaseService.databaseList(req.body.id)
  .then( (data: DatabaseInstance[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
})


router.post('/tableList',(req: Request, res: Response, next: NextFunction) => {
  if(!req.body.id) {
    res.json(new ApiResult(ResponseStatus.fail, "", "id为空！"))
    return
  }
  DatabaseService.tableList(req.body.id)
  .then( (data: TableInstance[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
})

export default router