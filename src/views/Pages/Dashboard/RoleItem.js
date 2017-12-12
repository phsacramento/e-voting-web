import React                                          from 'react';
import PropTypes                                      from 'prop-types';
import { Link }                                       from 'react-router';

export const RoleItem = (props) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">
          {props.title}
        </div>
        <div className="card-block">
          <Link to={'/votar/' + props.id} key={props.id}> 
            <button type="button" className="btn btn-primary">Ver candidatos</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

RoleItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired
}
