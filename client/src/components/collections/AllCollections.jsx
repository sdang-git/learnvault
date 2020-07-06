import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Collection from './Collection';

const AllCollections = ({ loggedInUser, userCollections }) => {
  // console.log('Invoked AllCollections', loggedInUser, userCollections);
  const [collections, setCollections] = useState([]);
  const { userId } = useParams();

  // console.log('useState collections', collections);
  // console.log('useParams userId', userId);

  useEffect(() => {
    // console.log('Invoked useEffect userCollections', userCollections);

    // Check if we are trying to get all collections for a specific user
    if (userCollections) {
      // console.log('fetching only collections for user', userId);
      fetch(`/api/collections/user/${userId}`)
        .then((res) => res.json())
        .then((result) => {
          // console.log(`AllCollections fetch /api/collections/${userId}`, result);
          setCollections(result);
        });

      return;
    }

    // Otherwise just get all collections
    // console.log('fetching all collections');
    fetch('/api/collections')
      .then((res) => res.json())
      .then((result) => {
        // console.log('AllCollections fetch /api/collections', result);
        setCollections(result);
      });
  }, [userId]);

  return (
    <div>
      <h1>{userCollections ? `${userId}'s Collections` : 'All Collections'}</h1>
      {collections[0] !== undefined ? (
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
        ))
      ) : (
        <li> Loading...</li>
      )}
    </div>
  );
};

export default AllCollections;
