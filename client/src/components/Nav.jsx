import React from 'react';
import { Button, Link } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { Link as RouterLink, useHistory, BrowserRouter } from 'react-router-dom';

import './Nav.css';

const Nav = ({
  loggedInUser, setLoggedInUser, timerId, setTimerId, setDarkMode, darkMode,
}) => {
  const history = useHistory();

  const logout = () => {
    console.log('logging out');
    clearTimeout(timerId);
    setTimerId('');
    setLoggedInUser('');
    history.push('/');
  };

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            {/* <Link to="/" className="nav__link">
              Home
            </Link> */}
            <Link component={RouterLink} to="/">Home</Link>
          </li>

          {!loggedInUser && (
            <>
              <li className="nav__item">
                {/* <Link to="/login" className="nav__link">
                  Login
                </Link> */}
                <Link component={RouterLink} to="/login">Login</Link>
              </li>
              <li className="nav__item">
                {/* <Link to="/register" className="nav__link">
                  Register
                </Link> */}
                <Link component={RouterLink} to="/register">Register</Link>
              </li>
            </>
          )}
          {loggedInUser && (
            <>
              <li className="nav__item">
                {/*  <Link to="/addcollection" className="nav__link">
                  Add Collection
              </Link> */}
                <Link component={RouterLink} to="/addcollection">Add Collection</Link>
              </li>
              <li className="nav__item">
                {/* <Link to="/savedcollections" className="nav__link">
                  Saved Collections
                </Link> */}
                <Link component={RouterLink} to="/savedcollections">Saved Collections</Link>
              </li>
              {/* Profile nav bar item not completed but functionality can be added */}
              {/* <li className="nav__item">
                <Link to="/profile" className="nav__link">
                  Profile
                </Link>
              </li> */}
              <li className="nav__item">
                {/* <button type="button" className="nav__link" onClick={logout}>
                  Logout
                </button> */}
                <Link href="#logout" onClick={logout}>Logout</Link>
              </li>
            </>
          )}
          {darkMode && (
            <Brightness4Icon style={{ color: 'white' }} />
          )}
          {!darkMode && (
            <Brightness4Icon style={{ color: 'black' }} />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
