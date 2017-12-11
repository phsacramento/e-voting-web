import React, { Component } from 'react';
import Profile              from '../lib/api/Profile';
import { connect }          from 'react-redux';
class Authorization extends Component {
  state = {
    currentUser: {}
  }
  componentWillMount() {
    Profile.getUser(sessionStorage.jwt).then(currentUser => {
      this.setState({currentUser});
      sessionStorage.user_id = currentUser.id;
    })
  }
  render(){
    const { role } = this.state.currentUser
    if (this.props.roles.includes(role)) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return null
    }
  }
}
function mapStateToProps (state) {
  return {
    currentUser: state.currentUser
  }
}
export default connect(
  mapStateToProps,
)(Authorization)