import React                                          from 'react'
import PropTypes                                      from 'prop-types';
import { Link }                                       from 'react-router'

export const RoleItem = (props) => {
  return (
    <tr>
      <td>
        <div>{props.id}</div>
      </td>
      <td>
        <div>
          <Link to={'/cargos/' + props.id} key={props.id}> {props.title}</Link>
        </div>
      </td>
    </tr>
  )
}

RoleItem.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number.isRequired
}
