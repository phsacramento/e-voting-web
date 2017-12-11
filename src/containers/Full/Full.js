import React from 'react';
import {Component} from 'react';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Footer from '../../components/Footer/';
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';
import Breadcrumbs from 'react-breadcrumbs';

class Full extends Component {
  render(){
    return (
      <div className="app">

        <Header />
      
        <div className="app-body">
      
          <Sidebar {...this.props} />
      
          <main className="main">
            <Breadcrumbs
              wrapperElement="ol"
              wrapperClass="breadcrumb"
              itemClass="breadcrumb-item"
              separator=""
              routes={this.props.routes}
              params={this.props.params}
            />
            <div className="container-fluid">
              {this.props.children}
            </div>
          </main>
      
        </div>
      
        <Footer />
      
        <Alert stack={{limit: 3}} html={true} />
      
      </div>
    );
  }
}

export default Full;
