import React from 'react';

const AddCollection = () => {
  const addCollection = (e) => {
    e.preventDefault();

    fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author,
        title,
        description,
        hidden,
        contributors,
        text,
        category,
        tags,
        links,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response: ', data);
      });
  };
  return (
    <div className="addCollection">
      <h1>Add New Collection</h1>
      <form>
        <label>
          Author:
          <input type="text" name="author" required />
        </label>
        <br />
        <label>
          Title:
          <input type="text" name="title" required />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <br />
        <label>
          Hidden:
          <input type="checkbox" name="hidden" required />
        </label>
        <br />
        <label>
          Contributors:
          <input type="text" name="contributors" />
        </label>
        <br />
        <label>
          Text:
          <input type="text" name="text" />
        </label>
        <br />
        <label>
          Category:
          <input type="text" name="category" />
        </label>
        <br />
        <label>
          Tags:
          <input type="text" name="tags" />
        </label>
        <br />
        <label>
          Links:
          <input type="text" name="links" />
        </label>
        <br />
        <input type="submit" value="Submit" onClick={addCollection} />
      </form>
    </div>
  );
};

export default AddCollection;
