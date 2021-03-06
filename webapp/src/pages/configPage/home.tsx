/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 23:25:08
 */
import React, { useEffect, useState } from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
import { Button, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import CreateDatabase from "./createConfig";
import ConfigServices from "../../services/config"
import { ConfigInstance } from "../../models/reducer/config";
import { useDispatch, useSelector } from "react-redux";
import { defaultStore } from "../../models/reducer";
import { Mode } from "../../models/reducer/commons";
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const [showCreateDatabase, setShowCreateDatabase] = useState<boolean>(false)
  const [mode, setMode] = useState<Mode>(Mode.EDIT)
  const [modifyConfig, setModifyConfig] = useState<ConfigInstance>()
  const dispatch = useDispatch()
  const Configstore = useSelector((state: defaultStore) => state.configStore)
  const [filterContent, setFilterContent] = useState<string>("")
  let delay: NodeJS.Timeout
  useEffect(() => {    
    ConfigServices.query((res: ConfigInstance[]) => {      
      // setData(res)      
      dispatch({
        type: "setConfigList",
        payload: res
      })
    })
    return () => {
      
    }
  }, [])

  const onClickSetting = (id: string) => {
    for (const item of Configstore.configList ) {
      if (item.id == id) {
        setMode(Mode.MODIFY)
        setModifyConfig(item)
        setShowCreateDatabase(true)
        return
      }      
    }
  }
  const onClickDelete = (id: string) => {
    ConfigServices.deleteConfig(id, (res) => {
      dispatch({
        type: "deleteConfig",
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
    setMode(Mode.EDIT)
    setShowCreateDatabase(status)
  }

  const FilterDatabase = (e: {target: {value: string}}) => {
    if (delay) {
      clearTimeout(delay)
    }
    delay = setTimeout(() => {
      setFilterContent(e.target.value)      
    }, 300);
  }

  return (
    <div id={styles.HomePage}>
      <div className={styles.HomeTopPanel}>
        <Space>
          <Input size="large" placeholder="搜索数据库" onChange={FilterDatabase}></Input>
          <Button size="large" type="primary" onClick={() => onToggleCreateStatus(true)}>创建</Button>
        </Space>
      </div>
      <Card 
        data={Configstore.configList.filter( item => item.name.includes(filterContent))} 
        clickData={onClickData}
        clickDelete={onClickDelete}
        clickSetting={onClickSetting}/>
      {
        showCreateDatabase && (
          <CreateDatabase
            mode={mode}
            defaultConfig={modifyConfig}
            clickCancel={ () => onToggleCreateStatus(false)}
          />
        )
      }
    </div>
  )
}

export default Home