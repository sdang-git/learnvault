import { Button, Link } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';

import './ExpandedCollection.css';

import LikeButton from './LikeButton';
import SaveButton from './SaveButton';
import EditButton from './EditButton';

const ExpandedCollection = ({ loggedInUser }) => {
  // console.log('Invoked ExpandedCollection', loggedInUser);
  const [collection, setCollection] = useState({ likes: [] });
  const { id } = useParams();

  // console.log('useState collection', collection);
  // console.log('useParams id', id);

  useEffect(() => {
    // console.log('Fetching /api/collections for', id);
    fetch(`/api/collections/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.log(result);
        }
        setCollection(result);
      });
  }, []);

  // console.log('useEffect collection', collection);
  return (
    <div className="collection-div">
      <h1>{collection.title}</h1>
      <h3>{collection.description}</h3>

      <div className="creator">
        <div className="creator__label">Creator:</div>
        <div className="creator__author">{collection.author}</div>
      </div>

      {collection.links && (
        <div className="links">
          {collection.links.map((link) => (
            <div className="links__item" key={link}>
              {/* <a href={link} target="_blank" rel="noreferrer">
                {link}
              </a> */}
              <Link href={link}>{link}</Link>
            </div>
          ))}
        </div>
      )}

      {loggedInUser ? (
        <div>
          <br />
          <LikeButton
            loggedInUser={loggedInUser}
            likes={collection.likes}
            id={id}
          />
          <SaveButton loggedInUser={loggedInUser} id={id} />
          {loggedInUser === collection.author && (
            <EditButton
              loggedInUser={loggedInUser}
              author={collection.author}
              id={id}
            />
          )}
        </div>
      ) : (
        <div>
          <Link component={RouterLink} to="/register">Register</Link>
          &nbsp;or&nbsp;
          <Link component={RouterLink} to="/login">Login</Link>
          &nbsp;to save this collection
        </div>
      )}
    </div>
  );
};

export default withTheme(ExpandedCollection);
