/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 13:39:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-22 17:28:30
 */
import { FC } from "react";
import styles from "../card/card.module.less"

export interface CardDataType {
  title: string ;
  img: string ;
  desc: string ;
}

interface Props {
  data: CardDataType[]
}

const Card: FC<Props> = (props) => {
  const { data, children } = props
  return (
    <div id={styles.Card}>
      {
        data.map( (item: CardDataType) => {
          return (   
            <div className={styles.cardItem}>
              <img src={item.img} alt={item.desc} />
              <span className="title">{item.title}</span>
              <div className="tools">
                {children}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Card