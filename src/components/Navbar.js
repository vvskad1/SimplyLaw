import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation

const Navbar = ({ handleLogout }) => {
  return (
    /*<nav>
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
    </nav>*/
    <nav class="navbar bg-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">SimplyLaw</a>
        <ul>
            <li><a class="navbar-link active">Home</a></li>
            <li><a class="navbar-link">About</a></li>
        </ul>
        </div>
    </nav>
  );
};

export default Navbar;