/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 00:50:20
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-24 16:36:34
 */

import { FrownFilled, FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Tabs, Tree } from "antd";
import { FC, useEffect, useState } from "react";
import { useHref, useLocation, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./style/details.module.less"
import TablePanel from "./tablePanel";

interface Props {

}

const Details: FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [detailsId, setDetailsId] = useState<number>(0)
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      icon: <SmileOutlined />,
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
          icon: <MehOutlined />,
        },
        {
          title: 'leaf',
          key: '0-0-1',
          icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
        },
      ],
    },
  ]
  useEffect(() => {
    const id = Number(searchParams.get('id'))
    setDetailsId(id)
    
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