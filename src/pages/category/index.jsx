import React, { Component } from 'react';
import { Card, Table, Button, Icon} from 'antd';
import './index.less'
import Buttons from '../../components/buttons'
export default class Category extends Component {
  
  render() {

    const columns = [{
      title: '品类名称',
      dataIndex: 'name',
    }, 
    {
      className:'dis',
      title: '操作',
      dataIndex: 'address',
      render: text => 
        <div>
          <Buttons>修改名称</Buttons>
          <Buttons>查看其子品类</Buttons>
        </div>
      
    }];
    
    const data = [{
      key: '1',
      name: '上衣',
    }, {
      key: '2',
      name: '半裙',
    }, {
      key: '3',
      name: '短裤',
    },{
      key: '4',
      name: '长裤',
    }, {
      key: '5',
      name: '连衣裙',
    }, {
      key: '6',
      name: '外套',
    },{
      key: '7',
      name: '帽子',
    }, {
      key: '8',
      name: '围巾',
    }, {
      key: '9',
      name: '口红',
    },{
      key: '10',
      name: '包包',
    },{
      key: '11',
      name: '鞋子',
    }, {
      key: '12',
      name: '项链',
    }, {
      key: '13',
      name: '手链',
    },{
      key: '14',
      name: '戒指',
    }, {
      key: '15',
      name: '耳饰',
    }, {
      key: '16',
      name: '发饰',
    }];

    return (
      <Card className="category"
        title="一级分类列表"
        extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}
      // style={{ width: 300 }}
      >
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={{
            defaultPageSize:5,
            pageSizeOptions:[5,10,15,20],
            showQuickJumper:true,
            showSizeChanger:true,
          }}
        />
        
      </Card>
    )
  }
}
