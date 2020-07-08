import React, { useState, useEffect } from 'react';

import Collection from './Collection';

const SavedCollections = ({ loggedInUser }) => {
  // console.log('Invoked SavedCollections', loggedInUser);
  const [collections, setCollections] = useState([]);
  const currentCollections = [];

  // console.log('useState collections', collections);

  useEffect(() => {
    // Get all collections for user
    // console.log('fetching savedcollections', loggedInUser);
    fetch(`/api/collections/savedcollections/${loggedInUser}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('fetch savedcollectiond data', data);
        if (data.length > 0) {
          data.map((id) => fetch(`/api/collections/${id}`)
            .then((res) => res.json())
            .then((result) => {
              // console.log('pushing currentCollection', result);
              currentCollections.push(result);
            }).then(() => {
              setCollections([...currentCollections]);
            }));
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.error('Error:', error);
        }
        // throw error
      });
  }, []);

  // console.log('currentCollections', currentCollections);
  // console.log('useEffect collections', collections);

  return (
    <div>
      <h1>Saved Collections</h1>
      {collections[0] !== undefined
        ? (
          collections.map((collection) => (
            <Collection
              key={collection._id}
              id={collection._id}
              title={collection.title}
              description={collection.description}
              author={collection.author}
              loggedInUser={loggedInUser}
              likes={collection.likes}
            />
          ))) : <li> Loading...</li>}
    </div>
  );
};

export default SavedCollections;
