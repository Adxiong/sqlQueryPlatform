/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:19:33
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 23:22:08
 */
import { CreateConfigParams } from './../types/database';
import { Router, Response, Request, NextFunction } from 'express';
import DatabaseService from "../service/database";
import { ConfigInstance } from '../types/database';
import { ApiResult, ResponseStatus} from '../utils/apiResult';

const router =  Router()


router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.queryConfigList()
  .then( (data: ConfigInstance[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
}) 

router.post('/createConfig', (req: Request, res: Response, next: NextFunction) => {
  DatabaseService.createConfig(req.body.data as CreateConfigParams)
  .then( (data: ConfigInstance) => {
    res.json(new ApiResult(ResponseStatus.success, data,"创建成功"))
  })
  .catch(next)
})

router.delete('/deleteDatabase', (req: Request, res: Response, next: NextFunction) => {  
  if(!req.query.id){
    res.json(new ApiResult(ResponseStatus.fail,"","id为空！"))
    return
  }
  DatabaseService.deleteConfig(req.query.id as string)
  .then( () => {        
    res.json(new ApiResult(ResponseStatus.success,"","删除成功"))    
  })
  .catch(next)
})


export default router