import React                                              from 'react';
import PropTypes                                          from 'prop-types';

const LoadingSpinner = (props) => {
  const cssClasses = `sk-wave ${props.css}`
  
  return (
    <div className={cssClasses}>
      <div className="sk-rect sk-rect1"></div>&nbsp;
      <div className="sk-rect sk-rect2"></div>&nbsp;
      <div className="sk-rect sk-rect3"></div>&nbsp;
      <div className="sk-rect sk-rect4"></div>&nbsp;
      <div className="sk-rect sk-rect5"></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  css: PropTypes.string // css classes to be applied to container. e.g. 'my-class my-sub-class'
}

export default LoadingSpinner;