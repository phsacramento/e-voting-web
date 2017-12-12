import React                                          from 'react'
import PropTypes                                      from 'prop-types';
import { Link }                                       from 'react-router'

export const CandidateItem = (props) => {
  return (
    <tr>
      <td>
        <div>{props.id}</div>
      </td>
      <td>
        <div>
          <Link to={'/candidatos/' + props.id} key={props.id}> {props.public_name}</Link>
        </div>
      </td>

      <td>
        <div>
          <div>{props.role_title}</div>
        </div>
      </td>
    </tr>
  )
}

CandidateItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired
}
