import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { NAVLINKS, ADMINLINKS, date } from '../constants/constants';
import { logout } from '../redux/slices/user';

const SideNav = () => {
  const dispatch = useDispatch();
  const signedIn = useSelector((state) => state.user.signedIn);
  const role = useSelector((state) => state.user.user.role);
  const name = useSelector((state) => state.user.user.name);
  const navigate = useNavigate();

  useEffect(() => {
    if (!signedIn) navigate('auth/sign_in');
  }, [signedIn, navigate]);

  return (
    <div className="w-full h-screen flex flex-col justify-between pt-20 lg:py-5 pl-10 lg:pl-0">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <img alt="" src="/images/logo.jpg" className="w-[30px]" />
          <h1 className="uppercase font-bold"><NavLink className="text-black text-[25px]" to="/"> DocCare</NavLink></h1>
        </div>
        <ul>
          {NAVLINKS.map(({ name, route }) => (
            <li key={name}>
              <NavLink
                to={route}
                className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97b70E] transition-colors duration-300 uppercase font-bold"
                style={({ isActive }) => ({ backgroundColor: isActive ? '#97af0e' : '', color: isActive ? '#fff' : '' })}
              >
                {name}
              </NavLink>
            </li>
          ))}
          {role === 'admin' && (
            ADMINLINKS.map(({ name, route }) => (
              <li key={name}>
                <NavLink
                  to={route}
                  className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97B70E] transition-colors duration-300 uppercase font-bold"
                  style={({ isActive }) => ({ backgroundColor: isActive ? '#97af0e' : '', color: isActive ? '#fff' : '' })}
                >
                  {name}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
      <div>
        <p className="flex items-center gap-1 mb-2 text-[16px]">
          <AiOutlineUser className="text-[20px]" />
          {name}
        </p>
        <button
          type="button"
          className="py-2 px-5 bg-red-400 w-[100%] hover:bg-red-300 mb-5 font-bold"
          onClick={() => dispatch(logout())}
        >
          LOGOUT
        </button>
        <p className="text-[15px]">
          &copy;
          {' '}
          {date.getFullYear()}
          {' '}
          Doc Care.
          <br />
          All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default SideNav;
