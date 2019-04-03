import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, } from 'antd';
import { withRouter, Link } from 'react-router-dom';

import menuList from '../../config/index';
import logo from '../../assets/image/logo.png';
import './index.less'
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;


@withRouter
class LeftNav extends Component {

  static propsTypes = {
    opacity: PropTypes.number.isRequired
  }

  constructor(props) {
    super(props);
    const openKeys = [];
    this.menus = this.createMenu(menuList, openKeys);
    this.state = {
      openKeys
    }
  }

  // createItem(item) {
  //   return <Item key={item.key}>
  //     <Link to={item.key} >
  //       <Icon type={item.icon} />
  //       <span>{item.title}</span>
  //     </Link>
  //   </Item>
  // }

  createMenu(menuList, openKeys) {

    const { pathname } = this.props.location;

    return menuList.map((menu) => {
      const children = menu.children;
      if (children) {
        return <SubMenu
          key={menu.key}
          title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}
        >
          {
            children.map((item) => {
              if (pathname === item.key) {
                openKeys.push(menu.key);
              }
            
              // return this.createItem(item)
              return <Item key={item.key}>
                <Link to={item.key}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Item>
            })
          }
        </SubMenu>
      }else {
        return <Item key={menu.key}>
          <Link onClick={this.handleClick} to={menu.key}>
            <Icon type={menu.icon} />
            <span>{menu.title}</span>
          </Link>
        </Item>
        // return this.createItem(menu)
      }
    })
  }
  handleOpenChange = (openKeys) => {
    this.setState({openKeys})
  }
  handleClick = () => {
    console.log("111111111111111111111111")
    this.setState({openKeys:[]})
  }
  render() {
    // 获取当前的路径
    // const { location, opacity } = this.props;
    // const { pathname } = location;
    // 解构赋值内仍可以嵌套解构赋值
    const {location:{pathname}, opacity} = this.props;
    console.log(this.state.openKeys);
    return (
      <Fragment>
        <Link to="/home" className="logo" onClick={this.handleClick}>
          <img src={logo} alt="logo" />
          <h1 style={{ opacity }}>硅谷后台</h1>
        </Link>
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline" openKeys={this.state.openKeys} onOpenChange={this.handleOpenChange}>
          {
            this.menus
          }

        </Menu>
      </Fragment>

    )
  }
}

export default LeftNav;







