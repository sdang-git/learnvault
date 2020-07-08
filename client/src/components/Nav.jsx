import React from 'react';
import { Button, Link } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
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

// import './Nav.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
  },
  links: {
  },
  link: {
    margin: '0px 10px',
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
    <AppBar position="fixed" color="default">
      <Toolbar className={classes.root}>
        <div className={classes.left}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            LearnVault
          </Typography>
        </div>
        <div className={classes.right}>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            className={classes.link}
            variant="h6"
          >
            Home
          </Link>
          {!loggedInUser && (
          <>
            <Link
              component={RouterLink}
              to="/login"
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              Login
            </Link>
            <Link
              component={RouterLink}
              to="/register"
              color="inherit"
              className={classes.link}
              variant="h6"
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
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              Add Collection
            </Link>
            <Link
              component={RouterLink}
              to={`/collections/user/${loggedInUser}`}
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              My Collections
            </Link>
            <Link
              component={RouterLink}
              to="/savedcollections"
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              Saved Collections
            </Link>
            <Link
              component={RouterLink}
              to="/profile"
              id="nav-profile"
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              Profile
            </Link>
            <Link
              href="#logout"
              onClick={logout}
              color="inherit"
              className={classes.link}
              variant="h6"
            >
              Logout
            </Link>
          </>
          )}
          <Button variant="text" onClick={() => setDarkMode(!darkMode)}>
            {darkMode && <Brightness7Icon style={{ color: 'white' }} />}
            {!darkMode && <Brightness4Icon style={{ color: 'white' }} />}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
