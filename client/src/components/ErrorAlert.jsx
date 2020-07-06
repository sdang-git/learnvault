import React from 'react';

const ErrorAlert = (props) => (
  <div>
    <button
      type="button"
      onClick={() => {
        props.setResult('null');
      }}
    >
      X
    </button>
    <h1>Error in AddCollection</h1>
    <p>Please check form and try again</p>
  </div>
);
export default ErrorAlert;
