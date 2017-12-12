import React                                      from 'react';
import PropTypes                                  from 'prop-types';
import { Link }                                   from 'react-router';
import VoteButton                                 from '../../../components/Common/VoteButton';


export const CandidateItem = (props) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          {props.public_name} 
        </div>
        <div className="card-block">
          <VoteButton candidate_id={props.id} role_id={props.role_id}  />
          <br/>
          Quantidade de votos: <strong>{ props.votes_count }</strong>
        </div>
      </div>
    </div>
  )
}

CandidateItem.propTypes = {
  public_name: PropTypes.string,
  id: PropTypes.number.isRequired
}
