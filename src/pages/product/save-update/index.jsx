import React, { Component } from 'react'
import { Card, Icon, Form, Input, Cascader, InputNumber, Button, message } from 'antd'
import './product-saveupdate-title.less'
import { reqGetCategories, reqAddProduct, reqUpdateProduct } from '../../../api/index';
import RichTextEditor from './rich-text-editor'

const Item = Form.Item;
@Form.create()
class SaveUpdate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
    this.richTextEditor = React.createRef();
  }

  formItemLayout = {
    // 调整Item中label占据多少列
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    // 调整Item的内容占据多少列
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 10 },
    },
  };

//回退到上一级
  goBack = () => {
    this.props.history.goBack();
  }


  //提交表单的操作
  submit = (e) => {
    e.preventDefault();

    //进行表单验证
    this.props.form.validateFields(async (err, values) => {
      if(!err) {
        const {name, desc, price, category } = values;
        const detail = this.richTextEditor.current.state.editorState.toHTML();
        let pCategoryId, categoryId;
        if(category.length === 1) {
          //只有1级分类
          pCategoryId = '0';
          categoryId = category[0];
        }else {
          pCategoryId = category[0];
          categoryId = category[1];
        }

        //判断是添加商品还是修改商品
        const {location: {state}} = this.props;
        let result = null;
        let msg = '';

        if(state) {
          result = await reqUpdateProduct({name, desc, price, pCategoryId, categoryId, detail, _id:state._id});
          msg = '修改商品成功';

        }else {
          result = await reqAddProduct({name, desc, price, pCategoryId, categoryId, detail });
          msg = '添加商品成功';

        }

        //发送请求
      
        if(result.status === 0) {
          //回到上一界面，添加成功引入的库会帮助主动清除添加过的数据
          message.success(msg)
          this.props.history.goBack();
        }else {
          message.error(result.msg);
        }
      }
    })
  }

  //添加商品品类里选择二级列表
  loadData = (selectedOptions) => {
    const targetOption = selectedOptions
    [selectedOptions.length - 1];

    targetOption.loading = true;
    this.getCategories(targetOption.value);
  }

  getCategories = async (parentId) => {
    const result = await reqGetCategories(parentId);
    if (result.status === 0) {
      if (parentId === '0') {
        this.setState({
          options: result.data.map((item) => {
            return {
              label: item.name,
              value: item._id,
              isLeaf: false
            }
          })
        })
      } else {
        this.setState({
          options: this.state.options.map((option) => {
            if (option.value === parentId) {
              option.children = result.data.map((item) => {
                return {
                  label: item.name,
                  value: item._id
                }
              })
              option.loading = false;
              option.isLeaf = true;
            }
            return option;
          })
        })
      }
    }else {
      message.error(result.msg);
    }

  }
  componentDidMount() {
    this.getCategories('0');
    const {state} = this.props.location;
    if(state) {
      const { pCategoryId, categoryId } = state;
      if(pCategoryId === '0') {
        this.category = [categoryId];
      }else {
        this.getCategories(pCategoryId);
        this.category = [pCategoryId, categoryId];
      }
    }
  }


  // composeCategory(pCategoryId, categoryId) {
  //   let category = null;
  //   if(pCategoryId === '0') {
  //     category = [categoryId];
  //   }else {
  //     category = [pCategoryId, categoryId]
  //   }
  //   return category
  // }
  


  render() {
    const { options } = this.state;
    const { form : { getFieldDecorator }, location : { state } } = this.props;

    return (
      <Card
        title={<div className=" product-saveupdate-title " onClick={this.goBack}>
          <Icon type="arrow-left" className="save-update-icon" />&nbsp;&nbsp;
        <span>添加商品</span>
        </div>}
      >
        <Form {...this.formItemLayout} onSubmit={this.submit}>
          <Item label="商品名称">
            {
              getFieldDecorator(
                'name',
                {
                  rules: [{ required: true, whiteSpace: true, message: '商品名称不能为空' }],
                  initialValue: state ? state.name : ''
                }
              )(<Input placeholder="请输入商品名称" />)
            }
          </Item>

          <Item label="商品描述">
            {
              getFieldDecorator(
                'desc',
                {
                  rules: [{ required: true, whiteSpace: true, message: '商品描述不能为空' }],
                  initialValue: state ? state.name : ''
                }
              )(<Input placeholder="请输入商品描述" />)
            }
          </Item>
          <Item
            label="选择分类"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 10 },
            }}
          >
            {
              getFieldDecorator(
                'category',
                {
                  rules: [{ required: true, message: '请选择商品分类' }],
                  initialValue: state ? this.composeCategory(state.pCategoryId, state.categoryId) : []
                }
              )(
                <Cascader
                  options={options}
                  // onChange={this.onChange}
                  placeholder="请选择分类"
                  changeOnSelect
                  loadData={this.loadData}
                />
              )
            }
          </Item>

          <Item
            label="商品价格"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 5 }
            }}
          >
            {
              getFieldDecorator(
                'price',
                {
                  rules: [{ required: true, message: '请输入商品价格' }],
                  initialValue: state ? state.price : ''
                }
              )(
                <InputNumber className="save-update-input-number"
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')} />
              )
            }
          </Item>

          <Item
            label="商品详情"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 21 }
            }}
          >
            <RichTextEditor ref={this.richTextEditor} detail={state ? state.detail : ''} />
          </Item>
          <Item>
            <Button type="primary" className="save-update-button" htmlType="submit">提交</Button>
          </Item>
        </Form>

      </Card>
    )
  }
}
export default SaveUpdate;
