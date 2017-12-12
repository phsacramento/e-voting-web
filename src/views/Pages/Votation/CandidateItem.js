import React                                          from 'react';
import PropTypes                                      from 'prop-types';
import { Link }                                       from 'react-router';

export const CandidateItem = (props) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          {props.public_name}
        </div>
        <div className="card-block">
          <Link to={'/votar/' + props.id} key={props.id}> 
            <button type="button" className="btn btn-primary">Votar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

CandidateItem.propTypes = {
  public_name: PropTypes.string,
  id: PropTypes.number.isRequired
}
