/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 01:35:47
 */
import Description from "../../components/description/description"
import React, { useState } from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
import { Button, Input, Space } from "antd";
import { useHref, useLocation, useNavigate, useRoutes } from "react-router-dom";
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const navigate = useNavigate()
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
  return (
    <div id={styles.HomePage}>
      <div className={styles.HomeTopPanel}>
        <Space>
          <Input size="large" placeholder="搜索数据库"></Input>
          <Button size="large" type="primary">创建</Button>
        </Space>
      </div>
      <Card 
        data={data} 
        clickData={onClickData}
        clickDelete={onClickDelete}
        clickSetting={onClickSetting}/>
    </div>
  )
}

export default Home