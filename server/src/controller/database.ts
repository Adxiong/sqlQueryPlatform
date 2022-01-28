import { CreateDatabaseParams, DatabaseInstance } from './../types/database';
/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 20:31:39
 */

import { Router, Response, Request, NextFunction } from 'express';
import DatabaseService from "../service/database";
import { ApiResult, ResponseStatus} from '../utils/apiResult';
import logger from '../utils/logger';

const router =  Router()

router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.queryDatabaseList()
  .then( (data: DatabaseInstance[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
}) 


router.post('/createDatabase', (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.createDatabase(req.body.data as CreateDatabaseParams)
  .then( (data: DatabaseInstance) => {
    res.json(new ApiResult(ResponseStatus.success, data,"创建成功"))
  })
  .catch(next)
})

router.delete('/deleteDatabase', (req: Request, res: Response, next: NextFunction) => {  
  if(!req.query.id){
    res.json(new ApiResult(ResponseStatus.fail,"","id为空！"))
    return
  }
  DatabaseService.deleteDatabase(req.query.id as string)
  .then( () => {
    console.log(1);
        
    res.json(new ApiResult(ResponseStatus.success,"","删除成功"))    
  })
  .catch(next)
})

router.post('/useDatabase', (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) {
    res.json(new ApiResult(ResponseStatus.fail, '数据不完整'))
    return
  }
  DatabaseService.useDatabase(req.body.name)
  .then( () => {
    res.json(new ApiResult(ResponseStatus.success))
  })
  .catch(next)
})

export default router