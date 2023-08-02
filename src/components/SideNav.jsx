import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVLINKS, date } from '../constants/constants';

const SideNav = () => (
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
);

export default SideNav;
