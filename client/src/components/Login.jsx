import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = ({ setLoggedInUser, setTimerId, timerId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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

  return (
    <div className="login">
      <h1>Login</h1>

      <form>
        <label htmlFor="login-email" className="input-label">
          <div className="input-label__text">Email</div>
          <input
            type="text"
            className="input-label__input"
            id="login-email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label htmlFor="login-password" className="input-label">
          <div className="input-label__text">Password</div>
          <input
            type="password"
            className="input-label__input"
            id="login-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
