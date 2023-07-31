import React from 'react';
import { NAVLINKS, date } from '../constants/constants';

const SideNav = () => (
  <div className=" w-full min-w-[375px] border-r h-screen flex flex-col justify-between py-5 pl-5">
    <div>
      <div className="mb-20 px-5">
        <h1>DocCare</h1>
      </div>
      <ul>
        {NAVLINKS.map(({ name, route }) => (
          <li key={name}>
            <a
              href={route}
              className="block py-2 px-5 text-gray-600 hover:text-white hover:bg-[#97BF0E] active:bg-blue-600 transition-colors duration-300"
            >
              {name}
            </a>
          </li>
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
