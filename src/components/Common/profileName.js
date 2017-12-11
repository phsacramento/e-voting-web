import React 																			from 'react'
import PropTypes 																	from 'prop-types';

export const ProfileName = (props) => {
  return (
    <span className="hidden-md-down">
      {props.currentUser.name}
    </span>
  )
}

ProfileName.propTypes = {
  currentUser: PropTypes.object
}
