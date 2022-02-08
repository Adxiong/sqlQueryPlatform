/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-28 23:19:33
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 16:46:53
 */
import { CreateConfigParams, ConfigInstance } from './../types/config';
import { Router, Response, Request, NextFunction } from 'express';
import ConfigService from "../service/config";
import { ApiResult, ResponseStatus} from '../utils/apiResult';

const router =  Router()


router.get("/list", (req: Request, res: Response, next: NextFunction) => {
  ConfigService.queryConfigList()
  .then( (data: ConfigInstance[]) => {
    res.json(new ApiResult(ResponseStatus.success, data))
  })
  .catch(next)
}) 

router.post('/createConfig', (req: Request, res: Response, next: NextFunction) => {
  ConfigService.createConfig(req.body.data as CreateConfigParams)
  .then( (data: ConfigInstance) => {
    res.json(new ApiResult(ResponseStatus.success, data,"创建成功"))
  })
  .catch(next)
})

router.post('/updateConfig', (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.data.id) {
    res.json(new ApiResult(ResponseStatus.fail, "", "id不能为空"))
    return
  }
  ConfigService.updateConfig(req.body.data as ConfigInstance)
  .then( () => {
    res.json(new ApiResult(ResponseStatus.success, {"message": 'ok'}, "更新成功"))
  } )
  .catch(next)
})

router.delete('/deleteConfig', (req: Request, res: Response, next: NextFunction) => {  
  if(!req.query.id){
    res.json(new ApiResult(ResponseStatus.fail,"","id为空！"))
    return
  }
  ConfigService.deleteConfig(req.query.id as string)
  .then( () => {        
    res.json(new ApiResult(ResponseStatus.success,"","删除成功"))    
  })
  .catch(next)
})


export default router