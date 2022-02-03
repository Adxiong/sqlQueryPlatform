/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-18 23:26:05
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-04 01:36:21
 */
import { DatabaseInstance, TableDataInfo } from './../types/database';
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

router.post('/queryTableData', (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.databaseName || !req.body.tableName) {
    res.json(new ApiResult(ResponseStatus.fail, "", "数据不完整"))
    return
  }
  DatabaseService.queryTableInfoByName(req.body.databaseName, req.body.tableName)
  .then( (data: TableDataInfo) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
})

router.post('/queryData', (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.sqlContent) {
    res.json(new ApiResult(ResponseStatus.fail, "", "查询语句为空"))
    return
  }
  DatabaseService.queryData(req.body.sqlContent)
  .then( (data: any[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
})

export default router