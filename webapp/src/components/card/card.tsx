/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 13:39:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-28 17:40:24
 */
import { FC } from "react";
import styles from "../card/card.module.less"
import mysqlPng from "../../assets/img/mysql.png"
import { SettingTwoTone, FundTwoTone, DeleteTwoTone} from '@ant-design/icons';
import { DatabaseInstance } from "../../models/reducer/home";


interface Props {
  data: DatabaseInstance[] ;
  clickDelete: (id: string) => void;
  clickSetting: (id: string) => void ;
  clickData: (id: string) => void;
}

interface logoMapType {
  [propKey: string]: string
}

const logoMap: logoMapType = {
  "mysql": mysqlPng
}

const Card: FC<Props> = (props) => {
  const { data, children } = props
  
  return (
    <div id={styles.Card}>
      {
        data.map( (item: DatabaseInstance) => {
          return (   
            <div className={styles.cardItem} key={item.id}>
              <img src={logoMap[item.type]} alt={item.name} />
              <div className={styles.content}>
                <span className={styles.title}>{item.name}</span>
                <div className={styles.tools}>
                  <div onClick={() => props.clickSetting(item.id)}>
                    <SettingTwoTone/>
                  </div>
                  <div onClick={ () => props.clickData(item.id)}>
                    <FundTwoTone/>
                  </div>
                  <div onClick={() => props.clickDelete(item.id)}>
                    <DeleteTwoTone/>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Card