import React, { Component }                     from 'react';
import { Link }                                 from 'react-router';

// Services
import ResourcesService                         from '../../../lib/api/ResourcesService'

// Components
import {RoleList}                               from './RoleList'
import LoadingSpinner                           from '../../../components/Common/LoadingSpinner';
import Pagination                               from '../../../components/Common/Pagination';
import Alert                                    from 'react-s-alert';

class Roles extends Component {

  state = {
    roles: [],
    large: false,
    loaded: false,
    page: 1,
    total: 0,
    totalPages: 0,
    query: null
  }

  serv = new ResourcesService('roles');

  toggleLarge = () => {
    this.setState({
      large: !this.state.large
    });
  }

  prevPage = () => {
    const page = this.state.page - 1;

    this.setState({page: page, loaded: false});
    this.loadRoles(page, this.state.query);
  }
  nextPage = () => {
    const page = this.state.page + 1;
    
    this.setState({page: page, loaded: false});
    this.loadRoles(page, this.state.query);
  };
  setPage = (evt) => {
    evt.preventDefault();
    const page = Number(evt.target.name);

    this.setState({page: page, loaded: false});
    this.loadRoles(page, this.state.query);
  };

  loadRoles = (page = 1, query = null) => {
    this.serv.load(page, query).then(response => {
      this.setState({
        roles: response.roles,
        total: response.total,
        totalPages: response.total / 10,
        loaded: true
      });
    }).catch(error => {
      Alert.error(`<p>${error}</p>`, {
          position: 'top',
          effect: 'stackslide',
          beep: false,
          timeout: 5000
      });
    });
  };

  componentWillMount() {
    this.loadRoles();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                Cargos cadastrados
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12 col-lg-12">
                    <div className="row">
                      <div className="col-sm-10">
                        <div className="callout callout-info">
                          <small className="text-muted">Total de cargos</small><br/>
                          <strong className="h4">{this.state.total}</strong>
                          <div className="chart-wrapper">
                            <canvas id="sparkline-chart-1" width="100" height="30"></canvas>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <Link to="/cargos/adicionar" className="pull-right" key="adicionar">
                          <button type="button" className="btn btn-primary">Adicionar</button>
                        </Link>
                      </div>
                    </div>
                    
                    <hr className="mt-0"/>
                  </div>
                </div>
                <br/>
                {this.state.loaded ? <RoleList handleClick={this.handleClick} roles={this.state.roles} /> : <LoadingSpinner/>}
              </div>
              <Pagination
                curPage={this.state.page}
                totalPages={Math.ceil(this.state.totalPages)}
                nextPageFunc={this.nextPage}
                prevPageFunc={this.prevPage}
                setPageFunc={this.setPage}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Roles
