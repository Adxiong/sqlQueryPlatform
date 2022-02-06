/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 00:50:20
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-06 21:05:58
 */

import { Button, Select, Table, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./style/details.module.less"
import DatabaseService from '../../services/database';
import { DatabaseInstance, TableDataInfoType, TableInstance } from "../../models/reducer/database";
import { useDispatch, useSelector } from "react-redux";
import { defaultStore } from "../../models/reducer";
import { LeafDataType, TreeDataType } from "../../models/reducer/commons";
import { Key } from "antd/lib/table/interface";
import DirectoryTree from "antd/lib/tree/DirectoryTree";
import { EventDataNode } from "antd/lib/tree";
import TextArea from "antd/lib/input/TextArea";
interface Props {

}

interface checkedTreeInfo{
  databaseId: string;
  tableId: string;
}

const Details: FC = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [columns, setColumns] = useState<any[]>([])
  const [descData, setDescData] = useState<any[]>([])
  const [descColumns, setDescColumns] = useState<any[]>([])
  const [treeData, setTreeData] = useState<any[]>([])
  const [checkedTreeNode, setCheckedTreeNode] = useState<checkedTreeInfo>({
    databaseId: "",
    tableId: ""
  })
  const [selectedDatabase, setSelectDatabase] = useState<string>("")
  const [sqlContent, setSqlContent] = useState<string>("")
  const [queryData, setQueryData] = useState<any[]>([])
  const [queryColumns, setQueryColumns] = useState<any[]>([])
  let delayTime: NodeJS.Timeout
  const  selectEvent = (value: string) => {
    setSelectDatabase(value)
  }
  const selectTreeNode = (value: Key[], e:{selected: boolean, selectedNodes: EventDataNode, node: { isLeaf: any; parentName: any; title: any; }, event: MouseEvent}) => {
    if (!e.node.isLeaf){
      setSelectDatabase(e.node.title)
      return
    } else {
      setCheckedTreeNode(state => {
        return {
          databaseId: state.databaseId,
          tableId: value[0] as string
        }
      })
      setSelectDatabase(e.node.parentName)
      DatabaseService.queryTableData({
        databaseName: e.node.parentName,
        tableName: e.node.title
      })
      .then ( (res) => {
        const result = res as TableDataInfoType
        if (!Object.keys(result.tableData[0]).includes('id')){
          result.tableData.map( (item, index) => {
            item.id = index
          })  
        }
        setData(result.tableData)
        setColumns(() => {
          if (!result.tableData.length) {
            return []
          }
          const keys = Object.keys(result.tableData[0])
          const data = []
          for (const item of keys) {
            data.push({
              title: item,
              dataIndex: item,
              sortDirections: ["ascend","descend"],
              sorter: (rowA: {[propKey:string]: string | number}, rowB: {[propKey:string]: string | number}) => {                                                
                if (rowA[item] > rowB[item]) {
                  return 1
                } else if( rowA[item] < rowB[item]) {
                  return -1
                } else {
                  return 0
                }
              },
              render: (value: string)=> {
                return value ?? "null"
              }
            })
          }
          return data
        })
        if (!Object.keys(result.descData[0]).includes('id')){
          result.descData.map( (item, index) => {
            item.id = index
          })  
        }
        setDescData(result.descData)
        setDescColumns( () =>{
          if (!result.descData.length) {
            return result as any
          }
          const keys = Object.keys(result.descData[0])
          const data = []
          for (const item of keys) {
            data.push({
              title: item,
              dataIndex: item,
              sortDirections: ["ascend","descend"],
              sorter(rowA: string | number, rowB: string | number) {                
                if (rowA > rowB) {
                  return 1
                } else if( rowA < rowB) {
                  return -1
                } else {
                  return 0
                }
              },
              render(value: string) {
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

  const inputTextEvent = (e: {target: {value: string}}) => {
    if (delayTime) {
      clearTimeout(delayTime)
    }
    setTimeout(() => {
      setSqlContent(e.target.value)
    }, 300);
  }

  const clickSearch = () => {
    DatabaseService.queryData( {
      sqlContent: sqlContent,
      selectDatabase: selectedDatabase
    })
    .then( (res) => {
      const data: any[] = res as any[]
      if (!Object.keys(data[0]).includes('id')){
        data.map( (item, index) => {
          item.id = index
        })  
      }
      setQueryData(data)
      setQueryColumns( () =>{
        if (!data.length) {
          return []
        }
        const keys = Object.keys(data[0])
        const columns = []
        for (const item of keys) {
          columns.push({
            title: item,
            dataIndex: item,
            sortDirections: ["ascend","descend"],
            sorter(rowA: string | number, rowB: string | number) {                
              if (rowA > rowB) {
                return 1
              } else if( rowA < rowB) {
                return -1
              } else {
                return 0
              }
            },
            render(value: string) {
              return value ?? "null"
            }
          })
        }
      return columns
    })})
    .catch( error => {
      console.log(error);
    } )
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
              rowKey={'id'}
              tableLayout="fixed"
              columns={columns}
              dataSource={data}
            ></Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="结构" key={2}>
            <Table
              rowKey={'id'}
              tableLayout="fixed"
              columns={descColumns}
              dataSource={descData}
            ></Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="查询" key={3}>
            <div className={styles.searchPanel}>
              <div className={styles.searchTopArea}>
                
                <div className={styles.tools}>
                  <Select 
                    value={selectedDatabase}
                    style={{minWidth: "200px"}} 
                    onChange={selectEvent}>
                    {
                      treeData.map( (item, index) => {
                        return (
                          <Select.Option key={index} value={item.title}>{item.title}</Select.Option>
                        )
                      })
                    }
                  </Select>
                  <Button onClick={clickSearch}>执行</Button>
                </div>
                <TextArea 
                  onChange={inputTextEvent}
                  autoSize={{minRows:8, maxRows:8}} 
                  autoFocus>
                </TextArea>
              </div>
              <Table
                rowKey={'id'}
                tableLayout="fixed"
                columns={queryColumns}
                dataSource={queryData}
              ></Table>
            </div>
            
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  )
}


export default Details