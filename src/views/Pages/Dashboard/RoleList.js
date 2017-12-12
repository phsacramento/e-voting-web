import React                              from 'react'
import {RoleItem}                         from './RoleItem'
import PropTypes                          from 'prop-types';

export const RoleList = (props) => {
  return (

      <div className="row">
        {props.roles.map(
          role =>
          <RoleItem key={role.id} {...role} />
          )
        }
      </div>

    
  )
}

RoleList.propTypes = {
  roles: PropTypes.array.isRequired
}
