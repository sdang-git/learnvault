import React, { useState } from 'react';

import './AddCollection.css';

const AddCollection = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hidden, setHidden] = useState('');
  const [contributors, setContributors] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
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
      })
      .catch((err) => {
        console.log('Error on add collection', err);
      });
  };

  return (
    <div className="addCollection">
      <h1>Add New Collection</h1>
      <form>
        <label>
          Author:
          <input
            type="text"
            name="author"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </label>
        <br />
        <label>
          Hidden:
          <input
            type="checkbox"
            name="hidden"
            onChange={() => setHidden(!hidden)}
            value={hidden}
          />
        </label>
        <br />
        <label>
          Contributors:
          <input
            type="text"
            name="contributors"
            onChange={(e) => setContributors(e.target.value)}
            value={contributors}
          />
        </label>
        <br />
        <label>
          Text:
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </label>
        <br />
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        <br />
        <label>
          Links:
          <input
            type="text"
            name="links"
            onChange={(e) => setLinks(e.target.value)}
            value={links}
          />
        </label>
        <br />
        <button type="submit" onClick={addCollection}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
