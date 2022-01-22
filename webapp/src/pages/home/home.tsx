/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-22 17:53:19
 */
import Description from "../../components/description/description"
import React from "react";
import Card from "../../components/card/card"
import styles from "./style/home.module.less"
interface Props {

}

const Home: React.FC<Props> = (props) => {
  const data = new Array(12).fill({
    title: "mysql",
    img: '',
    desc: '数据库'
  })
  const labelWidth = 100
  return (
    <div id={styles.HomePage}>
      <Description
        label="数据库"
        labelWidth={labelWidth}
      >
        <Card
          data={data}
          ></Card>
      </Description>
    </div>
  )
}

export default Home