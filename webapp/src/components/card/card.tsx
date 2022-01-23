/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 13:39:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-23 20:56:25
 */
import { FC } from "react";
import styles from "../card/card.module.less"
import mysqlPng from "../../assets/img/mysql.png"
import { SettingTwoTone, FundTwoTone, DeleteTwoTone} from '@ant-design/icons';
export interface CardDataType {
  title: string ;
  img: string ;
  desc: string ;
}

interface Props {
  data: CardDataType[]
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
        data.map( (item: CardDataType, index: number) => {
          return (   
            <div className={styles.cardItem} key={index}>
              <img src={logoMap[item.title]} alt={item.desc} />
              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.tools}>
                  <div>
                    <SettingTwoTone/>
                  </div>
                  <div>
                    <FundTwoTone />
                  </div>
                  <div>
                    <DeleteTwoTone />
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