/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 13:05:46
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 01:38:51
 */

import { Button, Form, Input, Modal, Select } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";
import React, { createRef, FC, RefObject, useRef, useState } from "react";
import styles from "./style/createDatabase.module.less"
import { ConfigInstance, CreateConfigParams } from "../../models/reducer/config"
import ConfigServices from "../../services/config"
import { useDispatch } from "react-redux";
import { log } from "console";
import { Mode } from "../../models/reducer/commons"
interface Props {
  mode: Mode,
  defaultConfig?: ConfigInstance,
  clickCancel: () => void;
}



const CreateConfig: FC<Props> = (props) => {
  const { clickCancel } = props
  const formRef:React.RefObject<FormInstance> = createRef<FormInstance>()
  const dispatch = useDispatch()
  const initialValues: CreateConfigParams = {
    name: props.defaultConfig?.name ?? "",
    type: props.defaultConfig?.type ?? "mysql",
    host: props.defaultConfig?.host ?? "localhost",
    port: props.defaultConfig?.port ?? 3306,
    user: props.defaultConfig?.user ?? 'root',
    password: props.defaultConfig?.password ?? ''
  }

  const [form, setForm] = useState<CreateConfigParams>(initialValues)
  const onSubmit = () => {
    formRef.current?.validateFields()
    .then( (form)=> {
      ConfigServices.createConfig(form, (res) => {        
        dispatch({
          type: "addDatabase",
          payload: res.data
        })
        props.clickCancel()
      })
    })
    .catch((err) => {
      console.error('表单验证失败', err)
    }) 
  }

  const onTestConnect = () => {
    formRef.current?.validateFields()
    .then( (form)=> {
      console.log(form);

    })
    .catch((err) => {
      console.error('表单验证失败', err)
    })
  }

  const onChangeForm = (changedValues: any, values: any) => {
    setForm(values)
  }
  return (
    <div id={styles.AddDatabasePanel}>
      <Modal 
        title={ props.mode == Mode.EDIT ? "创建连接" : "修改连接"} 
        centered
        visible={true}
        onCancel={clickCancel}
        footer={
          <div>
            <Button onClick={onTestConnect} type="primary">测试连接</Button>
            <Button onClick={onSubmit} type="primary">创建连接</Button>
            <Button onClick={clickCancel}>取消</Button>
          </div>
        }
        >
        <Form
          name="form"
          ref={formRef}
          labelAlign="left"
          initialValues={ initialValues }
          labelCol={{span:4}}
          wrapperCol={{span:20}}
          onValuesChange={onChangeForm}
        >
          <Form.Item 
            label="连接名"
            name="name"
            rules={
              [
                {required: true}
              ]
            }
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item
            label="数据库"
            name="type"
            rules={
              [
                {required: true}
              ]
            }
          >
            <Select>
              <Select.Option key="mysql" value="mysql">
                mysql
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item 
            label="主机"
            name="host"
            rules={[
              {required: true, message: "请输入主机地址！"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="端口"
            name="port"
            rules={[
              {required: true, message: "请输入端口号！"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="用户名"
            name="user"
            rules={[
              {required: true, message: "请输入用户名！"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="密码"
            name="password"
            rules={[
              {required: true, message: "请输入密码！"}
            ]}
            >
            <Input type="password" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateConfig