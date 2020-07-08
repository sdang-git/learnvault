import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';
import WithAuth from './components/WithAuth';

import AllCollections from './components/collections/AllCollections';
import ExpandedCollection from './components/collections/ExpandedCollection';
import SavedCollections from './components/collections/SavedCollections';
import AddCollection from './components/collections/AddCollection';

import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [timerId, setTimerId] = useState('');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(false);

  const theme = React.useMemo(
    () => createMuiTheme({
      overrides: {
        MuiAppBar: {
          colorDefault: {
            color: 'white',
            backgroundColor: darkMode ? '#424242' : '#1976d2',
          },
        },
      },
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#90caf9' : '#1976d2',
        },
      },
    }),
    [darkMode],
  );

  useEffect(() => {
    fetch('/api/checkToken')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        const error = new Error(res.statusText);
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.error(
            'Error: fetch /api/checkToken did not return status 200',
            error,
          );
          throw error;
        }
      })
      .then((data) => {
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.log('Success: fetch /api/checkToken', data);
        }
        setLoggedInUser(data);
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development'
        || process.env.NODE_ENV === 'test') {
          console.error('Error: fetch /api/checkToken caught error', err);
        }
        setLoggedInUser('');
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Nav loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} timerId={timerId} setTimerId={setTimerId} setDarkMode={setDarkMode} darkMode={darkMode} />
        <main className="main">
          <Switch>
            <Route path="/register">
              <Register setLoggedInUser={setLoggedInUser} />
            </Route>

            <Route path="/login">
              <Login setLoggedInUser={setLoggedInUser} setTimerId={setTimerId} timerId={timerId} />
            </Route>

            <Route path="/profile">
              {/* To protect a route, simply wrap it with a WithAuth component */}
              <WithAuth setLoggedInUser={setLoggedInUser} Component={Profile} loggedInUser={loggedInUser} />
            </Route>

            <Route path="/collections/user/:userId">
              <AllCollections userCollections loggedInUser={loggedInUser} />
            </Route>

            <Route path="/collections/:id">
              <ExpandedCollection loggedInUser={loggedInUser} />
            </Route>

            <Route path="/savedcollections">
              <WithAuth setLoggedInUser={setLoggedInUser} Component={SavedCollections} loggedInUser={loggedInUser} />
            </Route>

            <Route path="/addcollection">
              {/* <AddCollection loggedInUser={loggedInUser} /> */}
              <WithAuth setLoggedInUser={setLoggedInUser} Component={AddCollection} loggedInUser={loggedInUser} />
            </Route>

            <Route path="/" exact>
              <AllCollections loggedInUser={loggedInUser} />
            </Route>

            <Route path="/">
              <PageNotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </ThemeProvider>

  );
};

export default App;
