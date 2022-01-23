/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 00:50:20
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 01:35:24
 */

import { FC, useEffect, useState } from "react";
import { useHref, useLocation, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./style/details.module.less"

interface Props {

}

const Details: FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [detailsId, setDetailsId] = useState<number>(0)
  useEffect(() => {
    const id = Number(searchParams.get('id'))
    setDetailsId(id)
    
    return () => {
    }
  }, [])
  return (
    <div id={styles.detailsPanel}>
      详情页 {detailsId}
    </div>
  )
}


export default Details