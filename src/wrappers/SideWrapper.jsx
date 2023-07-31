import React from 'react';
import PropTypes from 'prop-types';
import MobileMenu from '../components/MobleMenu';

const SideWrapper = ({ children, onClick, active = false }) => (
  <>
    <div className="pl-5 pt-5 lg:p-0">
      <button className="lg:hidden burger-button " type="button" onClick={onClick}>
        <div className={`burger-line ${active ? 'active' : ''}`} />
        <div className={`burger-line ${active ? 'active' : ''}`} />
        <div className={`burger-line ${active ? 'active' : ''}`} />
      </button>
    </div>
    <div className="hidden lg:flex h-full border-r min-w-[250px] relative">{children}</div>
    <MobileMenu onModalClose={onClick} modalIsOpen={active} />
  </>
);

export default SideWrapper;

SideWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};
