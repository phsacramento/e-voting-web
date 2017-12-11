import React, { Component }                                       from 'react';
import { Dropdown, DropdownMenu, DropdownItem }                   from 'reactstrap';
import {bindActionCreators}                                       from 'redux';
import {connect}                                                  from 'react-redux';
import * as sessionActions                                        from '../../actions/sessionActions';
import Profile                                                    from '../../lib/api/Profile';
import { ProfileName }                                            from '../Common/profileName';

class Header extends Component {

  state = {
    currentUser: {},
    dropdownOpen: false
  }

  handleLogout = (evt) => {
    evt.preventDefault();
    this.props.actions.logOutUser();
  }

  componentWillMount() {
    Profile.getUser(sessionStorage.jwt).then(currentUser => {
      this.setState({currentUser});
      sessionStorage.user_id = currentUser.id;
    });
  }

  toggle = (evt) => {
    if(!!evt)
      evt.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render(){
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler hidden-lg-up" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>

        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <a onClick={this.toggle} className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <ProfileName currentUser={this.state.currentUser} />
              </a>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center">
                  <strong>Conta</strong>
                </DropdownItem>

                <DropdownItem>
                    <a href="#" onClick={this.handleLogout}>
                      <i className="fa fa-lock"></i> Logout
                    </a>
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item hidden-md-down">

          </li>
        </ul>
      </header>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(Header);
