import React, { useState } from 'react';

import './LikeButton.css';

const LikeButton = ({ id, loggedInUser, likes }) => {
  function likeButtonClick(eventId, userId) {
    const payload = { id: userId, collectionId: id };

    fetch(`/api/collections/like/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.log('Success:', data);
        }
        return data;
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development'
          || process.env.NODE_ENV === 'test') {
          console.error('Error:', error);
        }
        // throw error
      });
  }

  return (
    <>
      <span
        onClick={() => likeButtonClick(id, loggedInUser, likes)}
        onKeyPress={() => likeButtonClick(id, loggedInUser, likes)}
        type="button"
        className="button-like"
        role="button"
        tabIndex={0}
      >
        <i className="far fa-thumbs-up" />
        <small> {likes.length}</small>
      </span>
    </>
  );
};

export default LikeButton;
