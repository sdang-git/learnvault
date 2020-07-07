import React from 'react';
import { Link, useHistory, BrowserRouter } from 'react-router-dom';

import './Nav.css';

const Nav = ({
  loggedInUser, setLoggedInUser, timerId, setTimerId,
}) => {
  const history = useHistory();

  const logout = () => {
    // console.log('logging out');
    fetch('/api/logout')
      .then((response) => response.json())
      .then((data) => {
        console.log('Success /api/logout: ', data);
      })
      .catch((err) => {
        console.log('Error /api/logout: ', err);
      });
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
            <Link to="/" className="nav__link" id="nav-home">
              Home
            </Link>
          </li>

          {!loggedInUser && (
            <>
              <li className="nav__item">
                <Link to="/login" className="nav__link" id="nav-login">
                  Login
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/register" className="nav__link" id="nav-register">
                  Register
                </Link>
              </li>
            </>
          )}
          {loggedInUser && (
            <>
              <li className="nav__item">
                <Link to="/addcollection" className="nav__link" id="nav-addcollection">
                  Add Collection
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/savedcollections" className="nav__link" id="nav-savedcollections">
                  Saved Collections
                </Link>
              </li>
              {/* Profile nav bar item not completed but functionality can be added */}
              {/* <li className="nav__item">
                <Link to="/profile" className="nav__link" id="nav-profile">
                  Profile
                </Link>
              </li> */}
              <li className="nav__item">
                <button type="button" className="nav__link" onClick={logout} id="nav-logout">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
