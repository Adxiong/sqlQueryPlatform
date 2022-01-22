/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 13:39:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-22 20:05:55
 */
import { FC } from "react";
import styles from "../card/card.module.less"
import mysqlPng from "../../assets/img/mysql.png"
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
        data.map( (item: CardDataType) => {
          return (   
            <div className={styles.cardItem}>
              <img src={logoMap[item.title]} alt={item.desc} />
              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.tools}>
                  {/* {children} */}
                  <div>1</div>
                  <div>s</div>
                  <div>w</div>
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