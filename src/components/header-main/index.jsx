import React, { Component } from 'react'
import {Row, Col, message, Modal } from 'antd'
import dayjs from 'dayjs';
import { withRouter } from 'react-router-dom';


import memory from '../../utils/memory-utils';
import {removeItem} from '../../utils/storage-utils';
import {reqWeather} from '../../api';
import './index.less'
import Buttons from '../buttons';
import menuList from '../../config/index'

@withRouter
class HeaderMain extends Component {

  state = {
    sysTime: dayjs().format('YYYY-MM-DD  HH:mm:ss'),
    weatherImg:'http://api.map.baidu.com/images/weather/day/qing.png',
    weather:'晴'
  }

  //确认退去按钮
  exit = () => {
    Modal.confirm({
      title: '确定退出登录吗',
      onOk: () => {
        memory.user = {};
        removeItem();
        //跳转到登录页面
        this.props.history.replace('/login');
      },
      okText: '确认',
      cancelText: '取消',
    });
  }


  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: dayjs().format('YYYY-MM-DD  HH:mm:ss')
      })
    },1000);


    //获取天气数据
    reqWeather('西安')
      .then(res => {
        this.setState({
          weatherImg:res.weatherImg,
          weather:res.weather
        })
      })
      .catch(err => message.error(err,2))
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }



  getTitle = () => {
    // 获取path
    const { pathname } = this.props.location;

    for (let i = 0, length = menuList.length; i < length; i++) {
      const menu = menuList[i];
      const children = menu.children;
      if (children) {
        for (let j = 0, length = children.length; j < length; j++) {
          let item = children[j];
          if (item.key === pathname) {
            return item.title;
          }
        }
      } else {
        if (pathname === menu.key) {
          return menu.title;
        }
      }
    }
  }

  




  render() {
    const {sysTime, weatherImg, weather} = this.state;
    const title = this.getTitle();
    const username = memory.user.username;
    return (
      <div className="header-main">
        <Row className="header-main-top">
          <span>欢迎 {username}</span>
          <Buttons onClick={this.exit}>退出</Buttons>
        </Row>
        <Row className="header-main-bottom">
          <Col className="header-main-left" span={6}>{title}</Col>
          <Col className="header-main-right" span={18}>
            <span>{sysTime}</span>
            <img src={weatherImg} alt="天气"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default HeaderMain