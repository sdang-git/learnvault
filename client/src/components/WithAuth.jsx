import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const WithAuth = ({
  Component, setLoggedInUser, loggedInUser, id,
}) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  // console.log('props', Component, setLoggedInUser, loggedInUser, id);
  // console.log('useState loading', loading);
  // console.log('useState redirect', redirect);

  useEffect(() => {
    fetch('/api/checkToken')
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
        } else {
          const error = new Error(res.statusText);
          console.error('Error: fetch /api/checkToken did not return status 200', error);
          // throw error;
        }
      })
      .catch((err) => {
        console.error('Error: fetch /api/checkToken caught error', err);
        setLoggedInUser('');
        setLoading(false);
        setRedirect(true);
      });
  }, []);

  // console.log('useEffect loading', loading);
  // console.log('useEffect redirect', redirect);
  // console.log('useEffect loggedInUser', loggedInUser);

  if (loading) {
    // console.log('returning null');
    return null;
  }

  if (redirect) {
    // console.log('redirecting...');
    return (
      <Redirect to="/login" />
    );
  }

  // console.log('rendering Component', Component);
  return (
    <Component loggedInUser={loggedInUser} id={id} />
  );
};

WithAuth.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default WithAuth;
