/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-21 00:43:18
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-21 00:47:24
 */
import { FC } from "react"

interface Props {
  label: string,
  labelWidth: number,
  display?: string,
  className?: string,
  style?: React.CSSProperties
} 

const Description: FC<Props> = (props) => {
  return (
    <span className = {`description ${props.className || ""}`}>
      <label style={{width: props.labelWidth || 'auto'}}>{props.label}: 
        <span>{props.children}</span>
      </label>
    </span>
  )
}

export default Description