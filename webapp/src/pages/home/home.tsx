/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-23 20:08:13
 */
import Description from "../../components/description/description"
import React from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
import { Button, Input, Space } from "antd";
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const data = new Array(12).fill({
    title: "mysql",
    desc: '数据库'
  })
  return (
    <div id={styles.HomePage}>
      <div className={styles.HomeTopPanel}>
        <Space>
          <Input size="large" placeholder="搜索数据库"></Input>
          <Button size="large" type="primary">创建</Button>
        </Space>
      </div>
      <Card data={data}/>
    </div>
  )
}

export default Home