import React from 'react';

import './ResultAlert.css';

const ResultAlert = (props) => (
  <div id="result-alert">
    {props.result === 'error' ? (
      <div>
        <button
          type="button"
          onClick={() => {
            props.setResult(null);
          }}
        >
          X
        </button>
        <h1>Error in AddCollection</h1>
        <p>Please check form and try again</p>
      </div>
    ) : (
      <div>
        <h1>AddCollection successful</h1>
        <p></p>
      </div>
    )}
  </div>
);
export default ResultAlert;
