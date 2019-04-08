import React, { Component, Fragment } from 'react';
import { Card, Table, Input, Select, Button, Icon, message } from 'antd';
import Buttons from '../../components/buttons/index'
import {reqGetProducts} from '../../api/index'
import {Link} from 'react-router-dom';

const Option = Select.Option;
export default class Product extends Component {
  state = {
    product: [],
    total: 0
  }

//可复用
  columns = [{
    title: '商品名称',
    dataIndex: 'name',
  }, {
    title: '商品描述',
    className: 'column-money',
    dataIndex: 'money',
  }, {
    title: '价格',
    dataIndex: 'address',
  }, {
    title: '状态',
    className: 'column-money',
    key: 'zt',
    render: () => {
      return(
        <Fragment>
          <Button type="primary">上架</Button>&nbsp;&nbsp;&nbsp;
          <span>已下架</span> 
        </Fragment>
      )
    }
  }, 
  {
    title: '操作',
    className: 'column-money',
    key: 'cz',
    render: () => {
      return(
        <Fragment>
          <Buttons>详情</Buttons>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Buttons>修改</Buttons>
        </Fragment>
      )
    }
  }];

  getProducts = async (pageNum, PageSize = 3) => {
    const result = await reqGetProducts(pageNum, PageSize);
    if(result.status === 0) {
      this.setState({
        products:result.data.list,
        total:result.data.total
      })
    }else {
      message.error(result.msg)
    }
  }

  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const {products, total} = this.state;
    return (
      <Card
        title={
          <Fragment>
            <Select value={0} style={{ width: 130 }}>
              <Option value={0} key={0}>根据商品名称</Option>
              <Option value={1} key={1}>根据商品描述</Option>
            </Select>
            <Input placeholder="关键字" style={{ width: 200, margin: '0 10px' }} />
            <Button type="primary">搜索</Button>
          </Fragment>
        }
        extra={<Link to="/product/saveupdate"><Button type="primary"><Icon type="plus"/>添加产品</Button></Link>}
        style={{ width: '100%' }}
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
            showSizeChanger: true,
            total,
            onChange: this.getProducts,
            onShowSizeChange: this.getProducts
          }}
          rowKey="_id"
        />
      </Card>
    )
  }
}