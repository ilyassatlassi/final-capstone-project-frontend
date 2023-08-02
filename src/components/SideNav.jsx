import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { NAVLINKS, ADMINLINKS, date } from '../constants/constants';
import { logout } from '../redux/slices/user';

const SideNav = () => {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const role = useSelector((state) => state.user.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signedIn) navigate('auth/sign_in');
  }, [signedIn, navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-between pt-20 lg:py-5 pl-10 lg:pl-5">
      <div>
        <div className="mb-20 px-5">
          <h1 className="uppercase font-bold"><NavLink to="/"> DocCare</NavLink></h1>
        </div>
        <ul>
          {NAVLINKS.map(({ name, route }) => (
            <NavLink
              key={name}
              to={route}
              className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97BF0E] transition-colors duration-500 uppercase font-bold"
              style={({ isActive }) => ({ backgroundColor: isActive ? '#97bf0e' : '', color: isActive ? '#fff' : '' })}
            >
              {name}
            </NavLink>
          ))}
          {role === 'admin' && (
            ADMINLINKS.map(({ name, route }) => (
              <NavLink
                key={name}
                to={route}
                className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97BF0E] transition-colors duration-500 uppercase font-bold"
                style={({ isActive }) => ({ backgroundColor: isActive ? '#97bf0e' : '', color: isActive ? '#fff' : '' })}
              >
                {name}
              </NavLink>
            ))
          )}
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
  );
};

export default SideNav;
