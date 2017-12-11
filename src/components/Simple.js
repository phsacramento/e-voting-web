import React, { Component } from 'react';
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';
require('react-s-alert/dist/s-alert-css-effects/stackslide.css');

class Simple extends Component {
  render() {
    return (
      <div className="app flex-row align-items-center">
        {this.props.children}
        <Alert stack={{limit: 3}} html={true} />
      </div>
    );
  }
}

export default Simple;
