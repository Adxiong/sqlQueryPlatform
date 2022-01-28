/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 00:50:20
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-29 00:19:10
 */

import { FrownFilled, FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Tabs, Tree } from "antd";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./style/details.module.less"
import TablePanel from "../configPage/tablePanel";
import DatabaseService from '../../services/database';
import { DatabaseInstance } from "../../models/reducer/database";
import { useDispatch, useSelector } from "react-redux";
import { defaultStore } from "../../models/reducer";
interface Props {

}

const Details: FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const DatabaseStore = useSelector( (state: defaultStore) => state.databaseStore)
  const [treeData, setTreeData] = useState<any[]>()
  // const treeData = [
  //   {
  //     title: 'parent 1',
  //     key: '0-0',
  //     icon: <SmileOutlined />,
  //     children: [
  //       {
  //         title: 'leaf',
  //         key: '0-0-0',
  //         icon: <MehOutlined />,
  //       },
  //       {
  //         title: 'leaf',
  //         key: '0-0-1',
  //         icon: ({ selected }:{selected: any}) => (selected ? <FrownFilled /> : <FrownOutlined />),
  //       },
  //     ],
  //   },
  // ]
  useEffect(() => {
    const id = searchParams.get('id')
    if (!id) return
    DatabaseService.query(id, (res: DatabaseInstance[]) => {
      const treeData: any[] = []
      res.forEach( item => {
        treeData.push({
          title: item.name,
          key: item.id
        })
      })
      setTreeData(treeData)
    })
    // setDetailsId(id)
    
    return () => {
    }
  }, [])

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      render: (value: string)=> {
        return value || "-"
      }
    },
    {
      title: 'year',
      dataIndex: 'year',
      render: (value: string)=> {
        return value || "-"
      }
    }
  ]
  const data = new Array(10).fill({
    id: 1,
    name: 'adxiong',
    year: '2022-1-22'
  },)
  return (
    <div id={styles.detailsPanel}>
      <div className={styles.leftPanel}>
        <Tree
          showIcon
          treeData={treeData}
        >
        </Tree>
      </div>
      <div className={styles.content}>
        <Tabs>
          <Tabs.TabPane tab="name" key={1}>
            <TablePanel 
              columns={columns}
              data={data}
            ></TablePanel>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}


export default Details