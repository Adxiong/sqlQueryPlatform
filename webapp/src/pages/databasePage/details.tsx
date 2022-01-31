/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 00:50:20
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-01-31 19:49:57
 */

import { FrownFilled, FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Table, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./style/details.module.less"
import TablePanel from "../configPage/tablePanel";
import DatabaseService from '../../services/database';
import { DatabaseInstance, TableInstance } from "../../models/reducer/database";
import { useDispatch, useSelector } from "react-redux";
import { defaultStore } from "../../models/reducer";
import { LeafDataType, TreeDataType } from "../../models/reducer/commons";
import { Key } from "antd/lib/table/interface";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { EventDataNode } from "antd/lib/tree";
interface Props {

}

interface checkedTreeInfo{
  databaseId: string;
  tableId: string;
}

const Details: FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const DatabaseStore = useSelector( (state: defaultStore) => state.databaseStore)
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [treeData, setTreeData] = useState<any[]>()
  const [checkedTreeNode, setCheckedTreeNode] = useState<checkedTreeInfo>({
    databaseId: "",
    tableId: ""
  })
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
  const selectTreeNode = (value: Key[], e:{selected: boolean, selectedNodes: EventDataNode, node: { isLeaf: any; parentName: any; title: any; }, event: MouseEvent}) => {
    if (!e.node.isLeaf){
      return
    } else {
      setCheckedTreeNode(state => {
        return {
          databaseId: state.databaseId,
          tableId: value[0] as string
        }
      })
      DatabaseService.queryTableData({
        databaseName: e.node.parentName,
        tableName: e.node.title
      })
      .then ( (res) => {
        const result = res as any[]
        dispatch({
          type: 'setTableData',
          payload: result
        })
        setData(result)
        setColumns(() => {
          if (!result.length) {
            return result
          }
          const keys = Object.keys(result[0])
          const data = []
          for (const item of keys) {
            data.push({
              title: item,
              dataIndex: item,
              render: (value: string)=> {
                return value ?? "null"
              }
            })
          }
          return data
        })
      })
      .catch(err => {
        console.log(err);
        
      })
    }
  }

  useEffect(() => {
    const id = searchParams.get('id')
    if (!id) return
    DatabaseService.query(id, (res: DatabaseInstance[]) => {
      const treeData: TreeDataType[] = []
      res.forEach( item => {
        const leafData: LeafDataType[] = []
        item.tables.forEach(leaf => {
          leafData.push({
            title: leaf.name,
            key: leaf.id,
            isLeaf: true,
            parentName: item.name
          })
        });
        treeData.push({
          title: item.name,
          key: item.id,
          children: leafData
        })
      })
      setTreeData(treeData)
    })
    // setDetailsId(id)
    
    return () => {
    }
  }, [])
 
  return (
    <div id={styles.detailsPanel}>
      <div className={styles.leftPanel}>
        <DirectoryTree
          showIcon 
          height={800}
          treeData={treeData}
          onSelect={selectTreeNode}
        >
        </DirectoryTree>
      </div>
      <div className={styles.content}>
        <Tabs>
          <Tabs.TabPane tab="数据" key={1}>
            <Table
              tableLayout="fixed"
              columns={columns}
              dataSource={data}
            ></Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="结构" key={2}>
            <Table
              tableLayout="fixed"
              columns={columns}
              dataSource={data}
            ></Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="查询" key={3}>
            <Table
              tableLayout="fixed"
              columns={columns}
              dataSource={data}
            ></Table>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}


export default Details