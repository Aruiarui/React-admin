import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Buttons from '../buttons';

import './index.less'

export default class HeaderMain extends Component {
  render() {
    return (
      <div className="header-main">
        <Row className="header-main-top">
          <span>欢迎 登录</span>
          <Buttons >退出</Buttons>
        </Row>
        <Row className="header-main-tottom">
          <Col className="header-main-left" span={6}>主页</Col>
          <Col className="header-main-right" span={18}>
            <span>时间</span>
            <img src='http://api.map.baidu.com/images/weather/day/qing.png' alt="天气"/>
            <span>天气</span>
          </Col>
        </Row>
      </div>
    )
  }
}
