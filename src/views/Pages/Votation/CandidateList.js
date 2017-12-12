import React                              from 'react'
import {CandidateItem}                    from './CandidateItem'
import PropTypes                          from 'prop-types';

export const CandidateList = (props) => {
  return (

      <div className="row">
        {props.candidates.map(
          role =>
          <CandidateItem key={role.id} {...role} />
          )
        }
      </div>

    
  )
}

CandidateList.propTypes = {
  candidates: PropTypes.array.isRequired
}
