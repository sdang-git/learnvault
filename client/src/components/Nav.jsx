import React from 'react';
import { Button, Link } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {
  Link as RouterLink,
  useHistory,
  BrowserRouter,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './Nav.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Nav = ({
  loggedInUser,
  setLoggedInUser,
  timerId,
  setTimerId,
  setDarkMode,
  darkMode,
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            LearnVault
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            color="textPrimary"
            className={classes.title}
          >
            Home
          </Link>
          {!loggedInUser && (
            <>
              <Link
                component={RouterLink}
                to="/login"
                color="textPrimary"
                className={classes.title}
              >
                Login
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="textPrimary"
                className={classes.title}
              >
                Register
              </Link>
            </>
          )}
          {loggedInUser && (
            <>
              <Link
                component={RouterLink}
                to="/addcollection"
                color="textPrimary"
                className={classes.title}
              >
                Add Collection
              </Link>
              <Link
                component={RouterLink}
                to={`/collections/user/${loggedInUser}`}
                color="textPrimary"
                className={classes.title}
              >
                My Collections
              </Link>
              <Link
                component={RouterLink}
                to="/savedcollections"
                color="textPrimary"
                className={classes.title}
              >
                Saved Collections
              </Link>
              <Link
                component={RouterLink}
                to="/profile"
                className="nav__link"
                id="nav-profile"
                color="textPrimary"
                className={classes.title}
              >
                Profile
              </Link>
              <Link
                href="#logout"
                onClick={logout}
                color="textPrimary"
                className={classes.title}
              >
                Logout
              </Link>
            </>
          )}
          <Button variant="text" onClick={() => setDarkMode(!darkMode)}>
            {darkMode && <Brightness4Icon style={{ color: 'white' }} />}
            {!darkMode && <Brightness4Icon style={{ color: 'black' }} />}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
