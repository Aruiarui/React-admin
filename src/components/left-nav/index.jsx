import React, { Component } from 'react';
import { Menu, Icon, } from 'antd';
import { withRouter, Link } from 'react-router-dom';


const SubMenu = Menu.SubMenu;
const Item = Menu.Item;


@withRouter
class LeftNav extends Component {
  render() {
    // 获取当前的路径
    const { pathname } = this.props.location;
    return (
      <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline" defaultOpenKeys={['sub1']}>
        <Item key="/home">
        {/* 加link标签是完成点击切换url值 */}
          <Link to="/home">
            <Icon type="home" />
            <span>首页</span>
          </Link>
        </Item>
        <SubMenu
          key="sub1"
          title={<span><Icon type="appstore" /><span>商品</span></span>}
        >
          <Item key="/category">
            <Link to="/category">
              <Icon type="bars" />
              <span>品类管理</span>
            </Link>
          </Item>
          <Item key="/product">
            <Link to="/product">
              <Icon type="tool" />
              <span>商品管理</span>
            </Link>
          </Item>
        </SubMenu>

        <Item key="2">
          <Icon type="user" />
          <span>用户管理</span>
        </Item>
        
        <Item key="9">
          <Icon type="safety-certificate" />
          <span>权限管理</span>
        </Item>

        <SubMenu
          key="sub2"
          title={<span><Icon type="area-chart" /><span>图形图表</span></span>}
        >
          <Item key="6"><Icon type="bar-chart" /><span>柱形图</span></Item>
          <Item key="7"><Icon type="line-chart" /><span>折线图</span></Item>
          <Item key="8"><Icon type="pie-chart" /><span>饼图</span></Item>
        </SubMenu>
        
      </Menu>
    )
  }
}

export default LeftNav;







