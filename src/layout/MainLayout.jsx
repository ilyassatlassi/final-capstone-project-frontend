import React from 'react';
import PropTypes from 'prop-types';
import SideNav from '../components/SideNav';

const MainLayout = ({ children }) => (
  <div>
    <SideNav />
    <div>
      {children}
    </div>
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
