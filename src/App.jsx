import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';

import '../src/assets/less/reset.less'

export default class App extends Component {
  render() {
    return(
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Admin} />
        {/* <Redirect to='/login' /> */}
      </Switch>
      
    )
  }
}


//输入rpc
// import React, { PureComponent } from 'react'

// export default class componentName extends PureComponent {
//   render() {
//     return (
//       <div>
        
//       </div>
//     )
//   }
// }


//  输入imas
// import {  } from "module";
// 输入imprc
// import React, { PureComponent } from 'react'
// 输入ima
// import { originalName as alias } from 'module'
// 输入imp
// import moduleName from 'module'
// 输入imr
// import React from 'react'
