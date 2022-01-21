/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 13:39:30
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-21 21:32:30
 */
import { FC } from "react";

export interface CardType {
  
}

interface Props {
  data: []
  image: string
}

const Card: FC<Props> = (props) => {
  const { data, children } = props
  return (
    <div id="Card">
      {
        data.map( item => {
          return (   
            <div className="card-item">
              <img src={item.image} alt={item.desc} />
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