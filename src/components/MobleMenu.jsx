import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { NAVLINKS, date } from '../constants/constants';
import { logout } from '../redux/slices/user';

Modal.setAppElement('#root');

const MobileMenu = ({ modalIsOpen, onModalClose }) => {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signedIn) navigate('auth/sign_in');
  }, [signedIn, navigate]);

  return (
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
            <button
              type="button"
              className="py-2 px-5 bg-red-100 mb-5"
              onClick={() => dispatch(logout())}
            >
              LOGOUT
            </button>
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
};

MobileMenu.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
};
export default MobileMenu;
