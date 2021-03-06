/*
 * @Description: 
 * @version: 
 * @Author: Adxiong
 * @Date: 2022-01-24 13:05:46
 * @LastEditors: Adxiong
 * @LastEditTime: 2022-02-08 16:49:46
 */

import { Button, Form, Input, message, Modal, Select } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";
import React, { createRef, FC, RefObject, useRef, useState } from "react";
import styles from "./style/createDatabase.module.less"
import { ConfigInstance, CreateConfigParams } from "../../models/reducer/config"
import ConfigServices from "../../services/config"
import { useDispatch } from "react-redux";
import { log } from "console";
import { Mode } from "../../models/reducer/commons"
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
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
      switch (props.mode) {
        case Mode.EDIT:
          ConfigServices.createConfig(form, (res) => {        
            dispatch({
              type: "addConfig",
              payload: res.data
            })
            message.success("εε»Ίζε")
            props.clickCancel()
          })
          break
        case Mode.MODIFY:
          const data = {
            id: props.defaultConfig?.id,
            ...form
          }
          ConfigServices.updateConfig(data, (res: {data: ConfigInstance}) => {        
            dispatch({
              type: "updateConfig",
              payload: data
            })
            message.success("δΏ?ζΉζε")
            props.clickCancel()
          })
          break
        default: 
          message.error("ζͺη₯ιθ――")
      }
    })
    .catch((err) => {
      message.error('θ‘¨ειͺθ―ε€±θ΄₯', err)
    }) 
  }

  const onChangeForm = (changedValues: any, values: any) => {
    setForm(values)
  }
  return (
    <div id={styles.AddDatabasePanel}>
      <Modal 
        title={ props.mode == Mode.EDIT ? "εε»ΊθΏζ₯" : "δΏ?ζΉθΏζ₯"} 
        centered
        visible={true}
        onCancel={clickCancel}
        footer={
          <div>
            <Button onClick={onSubmit} type="primary">{props.mode == Mode.EDIT ? "εε»ΊθΏζ₯" : "δΏ?ζΉ"}</Button>
            <Button onClick={clickCancel}>εζΆ</Button>
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
            label="θΏζ₯ε"
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
            label="ζ°ζ?εΊ"
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
            label="δΈ»ζΊ"
            name="host"
            rules={[
              {required: true, message: "θ―·θΎε₯δΈ»ζΊε°εοΌ"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="η«―ε£"
            name="port"
            rules={[
              {required: true, message: "θ―·θΎε₯η«―ε£ε·οΌ"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="η¨ζ·ε"
            name="user"
            rules={[
              {required: true, message: "θ―·θΎε₯η¨ζ·εοΌ"}
            ]}
            >
            <Input autoComplete="off"/>
          </Form.Item>
          <Form.Item 
            label="ε―η "
            name="password"
            rules={[
              {required: true, message: "θ―·θΎε₯ε―η οΌ"}
            ]}
            >
            <Input.Password 
              allowClear 
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateConfig