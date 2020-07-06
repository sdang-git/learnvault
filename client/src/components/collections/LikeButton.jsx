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
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        <small>{likes.length}</small>
      </span>
    </>
  );
};

export default LikeButton;
