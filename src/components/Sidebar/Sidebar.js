import React, { Component }                         from 'react';
import { Link }                                     from 'react-router'
import Authorization                                from '../../auth/authorization';

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }


  render() {
    const Admin          = ["admin"]
    const Colaborator    = ["user"]

    return (

      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Dashboard
            </li>
            <li className="nav-item">
              <Link to={'/dashboard'} className="nav-link" activeClassName="actives"><i className="icon-speedometer"></i> Votações</Link>
            </li>
            <li className="nav-title">
              Navegação
            </li>

            <li className="nav-item">
              <Authorization roles={Admin}>
                <Link to={'/dashboard/cargos'} className="nav-link" activeClassName="active"><i className="icon-people"></i> Cargos</Link>
              </Authorization>
            </li>

            <li className="nav-item">
              <Authorization roles={Admin}>
                <Link to={'/dashboard/candidatos'} className="nav-link" activeClassName="active"><i className="icon-user-follow"></i> Candidatos</Link>
              </Authorization>
            </li>
            
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
