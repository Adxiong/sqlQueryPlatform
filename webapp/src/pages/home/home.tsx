/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 21:29:38
 */
import React, { useEffect, useState } from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
import { Button, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import CreateDatabase from "./createDatabase";
import services from "../../services/home"
import { DatabaseInstance } from "../../models/reducer/home";
import { useDispatch, useSelector } from "react-redux";
import { defaultStore } from "../../models/reducer";
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const [showCreateDatabase, setShowCreateDatabase] = useState<boolean>(false)
  const dispatch = useDispatch()
  const Homestore = useSelector((state: defaultStore) => state.HomeStore)
  useEffect(() => {    
    services.queryDatabaselist((res: DatabaseInstance[]) => {      
      // setData(res)      
      dispatch({
        type: "setDatabaseList",
        payload: res
      })
    })
    return () => {
      
    }
  }, [])

  const onClickSetting = (id: string) => {
  }
  const onClickDelete = (id: string) => {
    services.deleteDatabase(id, (res) => {
      dispatch({
        type: "deleteDatabase",
        payload: id,
      })
      message.success({
        content: "删除成功",
        duration: 1,
      })
    })
  }

  const onClickData = (id: string) => {
    navigate(`/home/details?id=${id}`)
  }
  const onToggleCreateStatus = (status: boolean) => {
    setShowCreateDatabase(status)
  }

  return (
    <div id={styles.HomePage}>
      <div className={styles.HomeTopPanel}>
        <Space>
          <Input size="large" placeholder="搜索数据库"></Input>
          <Button size="large" type="primary" onClick={() => onToggleCreateStatus(true)}>创建</Button>
        </Space>
      </div>
      <Card 
        data={Homestore.databaseList} 
        clickData={onClickData}
        clickDelete={onClickDelete}
        clickSetting={onClickSetting}/>
      {
        showCreateDatabase && (
          <CreateDatabase
            clickCancel={ () => onToggleCreateStatus(false)}
          />
        )
      }
    </div>
  )
}

export default Home