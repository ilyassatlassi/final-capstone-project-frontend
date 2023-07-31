import React from 'react';
import PropTypes from 'prop-types';

const MainWrapper = ({ children }) => (
  <div className="flex  h-screen w-full relative">
    {children}
  </div>
);

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainWrapper;
