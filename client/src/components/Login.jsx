import React, { useState } from 'react';
import clsx from 'clsx';
import {
  TextField, Button, InputLabel, InputAdornment, IconButton, OutlinedInput, FormControl, makeStyles,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '40ch',
  },
}));

const Login = ({ setLoggedInUser, setTimerId, timerId }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();

    if (!email || !password.password) return;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: password.password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If login was successful, redirect to homepage
        if (data.attempt === 'success') {
          clearTimeout(timerId);
          const newTimerId = setTimeout(() => {
            setLoggedInUser('');
            history.push('/login');
          }, 3600000);
          setTimerId(newTimerId);
          setLoggedInUser(data.userId);
          history.push('/');
        }
      })
      .catch((err) => {
        // TODO: handle error if fetch attempt fails
        console.log('Error on login: ', err);
      });
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <TextField id="outlined-required" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
        </FormControl>
        {/* </label> */}
        <br />
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={password.showPassword ? 'text' : 'password'}
            value={password.password}
            onChange={handleChange('password')}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {password.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              )}
            labelWidth={70}
          />
        </FormControl>
        <br />
        <Button onClick={login} variant="contained" color="primary">Login</Button>
      </form>
    </div>
  );
};

export default Login;
