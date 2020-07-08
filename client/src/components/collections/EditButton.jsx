import React, { useState } from 'react';

import './EditButton.css';

const EditButton = () => {
  return (
    <>
      <span
        onClick={() => console.log('edit!')}
        onKeyPress={() => console.log('edit!')}
        type="button"
        className="button-edit"
        role="button"
        tabIndex={0}
      >
        <i className="far fa-edit" />
        Edit
      </span>
    </>
  );
};

export default EditButton;
