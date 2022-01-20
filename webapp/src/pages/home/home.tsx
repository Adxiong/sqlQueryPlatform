/*
 * @Descripttion: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-16 18:31:37
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-21 00:50:14
 */
import Description from "../../components/description/description"
import React from "react";


interface Props {

}

const Home: React.FC<Props> = (props) => {
  const labelWidth = 100
  return (
    <div>
      <Description
        label="数据库"
        labelWidth={labelWidth}
      >
        <div>sdds</div>
      </Description>
    </div>
  )
}

export default Home