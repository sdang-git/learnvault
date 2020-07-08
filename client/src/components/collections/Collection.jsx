import React from 'react';
import { Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import LikeButton from './LikeButton';
import SaveButton from './SaveButton';

import './Collection.css';

const Collection = ({
  id, title, description, author, loggedInUser, likes,
}) => (
  <div key={id} className="collection">
    <h1 className="collection__title">{title}</h1>
    <h3>{description}</h3>

    <div className="creator">
      <div className="creator__label">Creator:</div>
      <div className="creator__author">{author}</div>
    </div>
    <div>
      {/* className="collection__button" */}
      <Button component={RouterLink} to={`/collections/${id}`} variant="contained" color="primary">
        View Collection
      </Button>
    </div>
    {loggedInUser ? (
      <div>
        <br />
        <LikeButton loggedInUser={loggedInUser} likes={likes} id={id} />
        <SaveButton loggedInUser={loggedInUser} id={id} />
      </div>
    ) : (
      <div>
        <br />
        <Link component={RouterLink} to="/register">Register</Link>
        &nbsp;or&nbsp;
        <Link component={RouterLink} to="/login">Login</Link>
        &nbsp;to save this collection
      </div>
    )}
  </div>
);

export default Collection;
