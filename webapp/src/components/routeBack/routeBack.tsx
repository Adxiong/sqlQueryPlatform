/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 17:22:32
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 17:37:02
 */

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { FC } from "react";
import { useHref, useLocation, useNavigate } from "react-router-dom";
import styles from './routeBack.module.less';

interface Props {

}

const RouteBack: FC<Props> = (props) => {
  return (
    <div id={styles.routeBack}>
      <Space onClick={() => history.back()}>
        <ArrowLeftOutlined />
        返回
      </Space>
    </div>
  )
}

export default RouteBack