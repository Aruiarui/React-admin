import React, { Component } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import './index.less';
import Buttons from '../../components/buttons';
import { reqGetCategories, reqAddCategory, reqUpdateCategoryName } from '../../api/index';
import AddCategoryForm from './add-category-form';
import UpdateCategoryNameForm from './update-category-name-form';

export default class Category extends Component {
  constructor(props) {
    super(props);

    //初始化状态来在之后更新展示数据
    this.state = {
      categories: [], // 一级分类数据
      subCategories: [], // 二级分类数据
      isShowAddCategoryModal: false, // 添加分类对话框显示
      isShowUpdateCategoryNameModal: false,//修改分类名称
      category: {},   //要操作的分类数据
      parentCategory: {},
      isShowSubCategories: false,
      isLoading: true
    }
    this.createAddForm = React.createRef();
    this.createUpdateForm = React.createRef();
  }

  // isLoading = true;
 

  //将columns定义成类的属性，下面在获取时就用this.columns来获取
  columns = [{
    title: '品类名称',
    dataIndex: 'name',
  },
  {
    className: 'operator',
    title: '操作',
    // dataIndex: 'address',
    render: category => {
      return <div>
        <Buttons onClick={this.showUpdateCategoryNameModal(category)}>修改名称</Buttons>&nbsp;&nbsp;
        {
          this.state.isShowSubCategories ? null : <Buttons onClick={this.showSubCategory(category)}>查看其子品类</Buttons>
        }
      </div>
    }
  }];

  showSubCategory = (parentCategory) => {
    return () => {
      this.setState({
        parentCategory,
        isShowSubCategories: true
      })
      this.getCategories(parentCategory._id);
    }
  }

  showUpdateCategoryNameModal = (category) => {
    return () => {
      this.setState({
        category
      })
      this.changeModal('isShowUpdateCategoryNameModal', true)();
    }
  }


  //请求分类数据据，为了之后复用
  getCategories = async (parentId) => {

    this.setState({ isLoading: true });
    const result = await reqGetCategories(parentId);
    const options = { isLoading: false };

    if (result.status === 0) {

      // const options = {};

      // if(result.data.length === 0) {
      //   this.isLoading = false;
      //   setTimeout(() => {
      //     this.isLoading = true;
      //   },0)
      // }
      if (parentId === '0') {
        options.categories = result.data;
      } else {
        options.subCategories = result.data;
      }
    } else {
      message.error(result.msg);
    }
    this.setState(options);
  }

  //发送请求，获取数据
  componentDidMount() {
    this.getCategories('0');
  }


  //添加品类
  addCategory = () => { 
    const { validateFields } = this.createAddForm.current.props.form;

    validateFields(async (err, values) => {
      console.log(err, values);
      if (!err) {
        const { parentId, categoryName } = values;
        const result = await reqAddCategory(parentId, categoryName);
        if (result.status === 0) {
          message.success('添加分类成功~');
          const options = { isShowAddCategoryModal: false };
          if (parentId === '0') {
            options.categories = [...this.state.categories, result.data];
          } else if (parentId === this.state.parentCategory._id) {
            options.subCategories = [...this.state.subCategories, result.data];
          }
          this.setState(options);
        } else {
          message.error(result.msg);
        }
      } else {
        // 校验失败 
      }
    })
  }


  //修改分类名称
  updateCategoryName = () => {
    const { validateFields, resetFields } = this.createUpdateForm.current.props.form;
    validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        const { category : { _id }, isShowSubCategories } = this.state;
        const result = await reqUpdateCategoryName(_id, categoryName);
        if (result.status === 0) {
          message.success('更新分类名称成功');
          let name = 'categories';
          if (isShowSubCategories) {
            name = 'subCategories'
          }
          this.setState({
            isShowUpdateCategoryNameModal: false,
            [name]: this.state[name].map((category) => {
              if (category._id === _id) return {...category, name: categoryName};
              return category;
            })
          })
          resetFields();
        } else {
          message.error(result.msg);
        }
      }
    })
  }

  changeModal = (name, isShow) => {
    return () => {
      if (name === 'isShowUpdateCategoryNameModal' && isShow === false) this.createUpdateForm.current.props.form.resetFields()
      this.setState({
        [name]: isShow
      })
    }
  }


  goBack = () => {
    this.setState({
      isShowSubCategories: false
    })
  }

  render() {
    const { categories, isShowAddCategoryModal, isShowUpdateCategoryNameModal, category: { name }, subCategories, parentCategory, isShowSubCategories, isLoading } = this.state;
    return (

      <Card className="category"
        title={isShowSubCategories ? <div><Buttons onClick={this.goBack}>一级分类</Buttons><Icon type="arrow-right" /><span>{parentCategory.name}</span></div> : '一级分类列表'}
        extra={<Button type="primary" onClick={this.changeModal('isShowAddCategoryModal', true)}><Icon type="plus" />添加品类</Button>}
      // style={{ width: 300 }}
      >
        <Table
          columns={this.columns}
          dataSource={isShowSubCategories ? subCategories : categories}
          bordered
          pagination={{
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '15', '20'],
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          rowKey="_id"//添加key属性，告诉key找_id
          // loading = {isShowSubCategories ? this.isLoading && !subCategories.length : this.isLoading && !categories.length}
          loading={isLoading}
        />
        <Modal
          title="添加分类"
          visible={isShowAddCategoryModal}
          onOk={this.addCategory}
          onCancel={this.changeModal('isShowAddCategoryModal', false)}
          okText="确认"
          cancelText="取消"
        >
          <AddCategoryForm categories={categories} wrappedComponentRef={this.createAddForm}/>
        </Modal>


        <Modal
          title="修改分类名称"
          visible={isShowUpdateCategoryNameModal}
          onOk={this.updateCategoryName}
          onCancel={this.changeModal('isShowUpdateCategoryNameModal', false)}
          okText="确认"
          cancelText="取消"
          width={300}
        >
          <UpdateCategoryNameForm categoryName={name} wrappedComponentRef={this.createUpdateForm}/>
        </Modal>
      </Card>
    )
  }
}
