import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ handleLogout, children }) => {
  return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    );
};

export default Layout;