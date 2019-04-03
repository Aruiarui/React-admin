import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

import { reqLogin } from "../../api/index";
import {setItem} from '../../utils/storage-utils';

import logo from '../../assets/image/logo.png';
import './index.less'

@Form.create()
class Login extends Component {
  login = (e) => {
    e.preventDefault();
    //
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        //校验成功
        const {username, password} = values
        const result = await reqLogin(username, password);
        console.log(result)

        if(result.status === 0) {
          message.success('登录成功');
          //保存数据
          setItem(result.data);
          //登录成功，跳转至admin页面
          this.props.history.replace('/');
        }else {
          message.error(result.msg, 2)
        }
        // console.log(values);
      } else {
        //校验失败
        console.log(err);
      }
    })
  }

  validator = (rule, value, callback) => {
    const length = value && value.length;
    const pwdReg = /^[a-zA-Z0-9_]+$/;

    if(!value) {
      callback('必须输入密码')
    }else if(length<4) {
      callback('密码必须大于4位')
    }else if(length>10) {
      callback('密码必须小于10位')
    }else if(!pwdReg.test(value)) {
      callback('密码必须是由字母、数字、下划线组成')
    }else {
      callback();
    }
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目-后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h3>用户登录</h3>
          <Form onSubmit={this.login} className="login-form">
            <Form.Item>
              {/* getFieldDecorator（标识名称，配置对象）（组件） */}
              {getFieldDecorator('username',{
                rules:[
                  {required:true, message:'必须输入用户名', whitespace:true},
                  {min:4, message:'用户名必须大于4位'},
                  {max:10, message:'用户名必须小于10位'},
                  {pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是由字母、数字、下划线组成'}],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password',{
                rules:[
                  {validator: this.validator}
                  // {required:true, message:'必须输入密码', whitespace:true},
                  // {min:4, message:'密码必须大于4位'},
                  // {max:4, message:'密码必须小于10位'},
                  // {pattern:/^[a-zA-Z0-9_]+$/, message:'密码必须是由字母、数字、下划线组成'}
                ],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
              
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>

      
    )
  } 
}
// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;
