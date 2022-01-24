/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 16:09:41
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 16:26:10
 */

import { FC } from "react";
import { Table } from "antd";
import styles from "./style/tablePanel.module.less"

interface Props {
  data: any[],
  columns: any[]
}

const TablePanel: FC<Props> = (props) => {
  const { columns, data } = props
  return (
    <div id={styles.tablePanel}>
      <Table
        bordered
        rowKey="id"
        columns={columns}
        dataSource={data}
      >

      </Table>
    </div>
  )
}

export default TablePanel