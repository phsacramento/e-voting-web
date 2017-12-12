import React                              from 'react'
import {RoleItem}                         from './RoleItem'
import PropTypes                          from 'prop-types';

export const RoleList = (props) => {
  return (
    <table className="table table-hover table-outline mb-0 hidden-sm-down">
      <thead className="thead-default">
        <tr>
          <th>ID</th>
          <th>Título</th>
        </tr>
      </thead>
      <tbody>
      {props.roles.map(
        role =>
        <RoleItem key={role.id} {...role} />
        )
      }

      </tbody>
    </table>
  )
}

RoleList.propTypes = {
  roles: PropTypes.array.isRequired
}
