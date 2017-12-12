import React, { Component }                     from 'react';
import { Link }                                 from 'react-router';

// Services
import ResourcesService                         from '../../../lib/api/ResourcesService';

// Components
import {CandidateList}                          from './CandidateList';
import LoadingSpinner                           from '../../../components/Common/LoadingSpinner';
import Pagination                               from '../../../components/Common/Pagination';
import Alert                                    from 'react-s-alert';

class Votation extends Component {

	state = {
    candidates: [],
    large: false,
    loaded: false,
    page: 1,
    total: 0,
    totalPages: 0,
    query: null
  }

  serv = new ResourcesService('candidates');

  prevPage = () => {
    const page = this.state.page - 1;

    this.setState({page: page, loaded: false});
    this.loadCandidates(page, this.state.query);
  }
  nextPage = () => {
    const page = this.state.page + 1;
    
    this.setState({page: page, loaded: false});
    this.loadCandidates(page, this.state.query);
  };
  setPage = (evt) => {
    evt.preventDefault();
    const page = Number(evt.target.name);

    this.setState({page: page, loaded: false});
    this.loadCandidates(page, this.state.query);
  };

  loadCandidates = (page = 1, query = null) => {
    this.serv.load(page, query).then(response => {
      this.setState({
        candidates: response.candidates,
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
    this.loadCandidates();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">

        	<div className="col-md-12">
        	  <div className="card">
        	    <div className="card-header">
        	      Cargos disponíveis para votação nesse cargo
        	    </div>
        	    <div className="card-block">
        	      
                  
                  {this.state.loaded ? <CandidateList handleClick={this.handleClick} candidates={this.state.candidates} /> : <LoadingSpinner/>}

                
        	    </div>
        	  </div>
        	</div>

        </div>
      </div>
    )
  }
}

export default Votation;
