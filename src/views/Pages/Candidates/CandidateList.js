import React                              from 'react'
import {CandidateItem}                    from './CandidateItem'
import PropTypes                          from 'prop-types';

export const CandidateList = (props) => {
  return (
    <table className="table table-hover table-outline mb-0 hidden-sm-down">
      <thead className="thead-default">
        <tr>
          <th>ID</th>
          <th>Nome público</th>
          <th>Cargo</th>
        </tr>
      </thead>
      <tbody>
      {props.candidates.map(
        candidate =>
        <CandidateItem key={candidate.id} {...candidate} />
        )
      }

      </tbody>
    </table>
  )
}

CandidateList.propTypes = {
  candidates: PropTypes.array.isRequired
}
