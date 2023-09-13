import React from 'react';
import moment from 'moment';
import '../../index.scss';

export const Nav = () => {
  return (
    <nav className="flex bg-green-200 p-2 justify-between">
      <div className="flex">
        <div className="">Home</div>
        {['App1', 'App2', 'App3', 'App4'].map((name) => (
          <NavItem key={name} text={name} />
        ))}
      </div>
      <div className="items-end">
        Last Logged In: {moment(moment.now()).format('DD-MMM-YY')}
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="pl-2 hover:bg-green-700 hover:text-green-50">{text}</div>
  );
};

export default Nav;
