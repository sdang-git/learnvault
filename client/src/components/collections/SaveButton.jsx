import React from 'react';

const SaveButton = ({ id, loggedInUser }) => {
  function likeButtonClick(eventId, userId) {
    const payload = { id: userId, collectionId: id };

    fetch(`/api/collections/save/${id}`, {
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
      });
  }

  return (
    <span
      onClick={() => likeButtonClick(id, loggedInUser)}
      onKeyPress={() => likeButtonClick(id, loggedInUser)}
      role="button"
      tabIndex={0}
      type="button"
      className="button-like"
    >
      <i className="far fa-star" />
    &nbsp; Save Collection
    </span>
  );
};

export default SaveButton;
