import React, {Component} from 'react';

function withHOC(WrappedComponent) {
  return class extends Component {
    render() {
      return(
        <WrappedComponent />
      )
    }
  }
} 