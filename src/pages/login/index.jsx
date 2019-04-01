import React, { Component } from 'react';
import {
  Form, Icon, Input, Button
} from 'antd';

import logo from './logo.png'
import './index.less'

@Form.create()
class Login extends Component {
  login = (e) => {
    e.preventDefault();
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
      callback('用户名必须是由字母、数字、下划线组成')
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
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName',{
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
            {getFieldDecorator('passWord',{
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
export default Login;
