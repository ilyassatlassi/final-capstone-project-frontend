import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { NAVLINKS, date } from '../constants/constants';

Modal.setAppElement('#root');

const MobileMenu = ({ modalIsOpen, onModalClose }) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={onModalClose}
    iaHideApp={false}
    style={{
      content: {
        // width: 'fit-content',
        zIndex: '500',
        inset: '0px',
        padding: '0px',
        borderRadius: 'none',
        position: 'relative',
        top: '50%',
        left: '50%',
      },
      overlay: {
        background: 'rgba(0,0,0,0.65)',
        zIndex: '500',
        display: 'flex',
        overflow: 'auto',
      },
    }}
    contentLabel="switch account modal"
  >
    <div className="h-full border-r min-w-[250px] relative">
      <div className="w-full h-full flex flex-col justify-between pt-20 lg:py-5 pl-10 lg:pl-5">
        <div>
          <div className="mb-20 px-5">
            <h1 className="uppercase font-bold"><NavLink to="/" onClick={onModalClose}> DocCare</NavLink></h1>
          </div>
          <ul>
            {NAVLINKS.map(({ name, route }) => (
              <NavLink
                key={name}
                to={route}
                className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97BF0E] transition-colors duration-500 uppercase font-bold"
                style={({ isActive }) => ({ backgroundColor: isActive ? '#97bf0e' : '', color: isActive ? '#fff' : '' })}
                onClick={onModalClose}
              >
                {name}
              </NavLink>
            ))}
          </ul>
        </div>
        <div className="px-5">
          <p>
            &copy;
            {' '}
            {date.getFullYear()}
            {' '}
            DocCare
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

MobileMenu.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};
export default MobileMenu;
