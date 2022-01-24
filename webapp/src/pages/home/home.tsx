/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 13:29:40
 */
import React, { useState } from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import CreateDatabase from "./createDatabase";
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const navigate = useNavigate()
  const [showCreateDatabase, setShowCreateDatabase] = useState<boolean>(false)
  const [data, setData] = useState<any[]>(new Array(12).fill({
    title: "mysql",
    desc: '数据库'
  }))

  const onClickSetting = (id: number) => {
  }
  const onClickDelete = (id: number) => {
    setData([...data.filter( (item,index) => index != id)])
  }

  const onClickData = (id: number) => {
    navigate(`/home/details?id=${id}`)
  }
  const onToggleCreateStatus = (status: boolean) => {
    setShowCreateDatabase(status)
  }

  const onCancelCreate = () => {
    setShowCreateDatabase(false)
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
        data={data} 
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