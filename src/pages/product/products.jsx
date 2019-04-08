import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import Index from './index';
import Detail from './detail';
import SaveUpdate from './save-update';

export default class Products extends Component {
  render() {
    return (
      // <Switch>
      //   <Route path="/product/index" conponent={Index}/>
      //   <Route path="/product/detail" conponent={Detail}/>
      //   <Route path="/product/save-update" conponent={SaveUpdate}/>
      //   <Redirect to="/product/index"/>
      // </Switch>
    )
  }
}
