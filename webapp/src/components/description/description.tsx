/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 00:43:18
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-22 17:51:03
 */
import { FC } from "react"
import styles from './description.module.less'

interface Props {
  label: string,
  labelWidth: number,
  display?: string,
  className?: string,
  style?: React.CSSProperties
} 

const Description: FC<Props> = (props) => {
  return (
    <span className = {`${styles.descriptionPanel} ${props.className || ""}`}>
      <label style={{width: props.labelWidth || 'auto'}}>
        <span className={styles.title}>{props.label}: </span>
        {props.children}
      </label>
    </span>
  )
}

export default Description